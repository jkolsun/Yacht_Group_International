import Bull from 'bull'
import { config } from '../config'
import type {
  SMSFollowupJob,
  EmailFollowupJob,
  CRMSyncJob,
  LinkEngagementJob,
} from '../types'

// ============================================================
// Queue Instances
// ============================================================

const redisOpts = { redis: config.redisUrl }

export const smsFollowupQueue = new Bull<SMSFollowupJob>('sms-followup', config.redisUrl)
export const emailFollowupQueue = new Bull<EmailFollowupJob>('email-followup', config.redisUrl)
export const crmSyncQueue = new Bull<CRMSyncJob>('crm-sync', config.redisUrl)
export const linkEngagementQueue = new Bull<LinkEngagementJob>('link-engagement', config.redisUrl)

// ============================================================
// Queue Helpers (used by lead-processor)
// ============================================================

export function queueEmailFollowup(
  leadId: string,
  email: string,
  name: string,
  type: 'qualification_link' | 'followup',
  delay: number
) {
  emailFollowupQueue.add({ leadId, email, name, type }, { delay, attempts: 3, backoff: 5000 })
}

export function queueSMSFollowup(
  leadId: string,
  phone: string,
  name: string,
  type: 'qualification_link' | 'followup' | 'reminder',
  delay: number
) {
  smsFollowupQueue.add({ leadId, phone, name, type }, { delay, attempts: 3, backoff: 5000 })
}

export function queueCRMSync(leadId: string, action: 'create' | 'update', delay: number) {
  crmSyncQueue.add({ leadId, action }, { delay, attempts: 3, backoff: 10000 })
}

export function queueLinkEngagementCheck(leadId: string, checkType: 'initial', delay: number) {
  linkEngagementQueue.add({ leadId, checkType }, { delay, attempts: 2, backoff: 30000 })
}

// ============================================================
// Initialize Processors (called once on server start)
// ============================================================

export async function initializeQueues() {
  // SMS Followup
  const { processSMSFollowup } = await import('./processors/sms-followup')
  smsFollowupQueue.process(async (job) => processSMSFollowup(job.data))

  // Email Followup (inline — fetches lead then calls email service)
  emailFollowupQueue.process(async (job) => {
    const { default: prisma } = await import('@/lib/db')
    const emailService = await import('../services/email-service')

    const { leadId, email, name, type } = job.data
    const lead = await prisma.lead.findUnique({ where: { id: leadId } })

    if (!lead?.qualificationLink) {
      throw new Error(`Lead ${leadId} not found or missing qualification link`)
    }

    if (type === 'qualification_link') {
      return emailService.sendQualificationEmail(leadId, email, name, lead.qualificationLink)
    } else {
      return emailService.sendFollowupEmail(leadId, email, name, lead.qualificationLink)
    }
  })

  // CRM Sync
  const { processCRMSync } = await import('./processors/crm-sync')
  crmSyncQueue.process(async (job) => processCRMSync(job.data))

  // Link Engagement Check
  const { processLinkEngagement } = await import('./processors/link-engagement')
  linkEngagementQueue.process(async (job) => processLinkEngagement(job.data))

  console.log('[YGI QUEUES] All queue processors registered')
}

// ============================================================
// Queue Stats
// ============================================================

export async function getQueueStats() {
  const [sms, email, crm, engagement] = await Promise.all([
    smsFollowupQueue.getJobCounts(),
    emailFollowupQueue.getJobCounts(),
    crmSyncQueue.getJobCounts(),
    linkEngagementQueue.getJobCounts(),
  ])

  return {
    smsFollowup: sms,
    emailFollowup: email,
    crmSync: crm,
    linkEngagement: engagement,
  }
}

// ============================================================
// Graceful Shutdown
// ============================================================

export async function closeQueues() {
  await Promise.all([
    smsFollowupQueue.close(),
    emailFollowupQueue.close(),
    crmSyncQueue.close(),
    linkEngagementQueue.close(),
  ])
  console.log('[YGI QUEUES] All queues closed')
}
