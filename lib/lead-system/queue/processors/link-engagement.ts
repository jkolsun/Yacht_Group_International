import prisma from '@/lib/db'
import { LeadStatus } from '../../types'
import * as smsService from '../../services/sms-service'
import { config } from '../../config'
import type { LinkEngagementJob } from '../../types'

export async function processLinkEngagement(data: LinkEngagementJob) {
  const { leadId } = data

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: {
      id: true,
      name: true,
      phone: true,
      status: true,
      smsCount: true,
      qualificationLink: true,
      linkOpenedAt: true,
      qualificationStartedAt: true,
      qualificationCompletedAt: true,
    },
  })

  if (!lead) {
    console.log(`[ENGAGEMENT] Lead ${leadId} not found, skipping`)
    return
  }

  // Don't touch DNC leads
  if (lead.status === LeadStatus.DO_NOT_CONTACT) {
    console.log(`[ENGAGEMENT] Lead ${leadId} is DO_NOT_CONTACT, skipping`)
    return
  }

  if (!lead.qualificationLink) {
    console.log(`[ENGAGEMENT] Lead ${leadId} has no qualification link, skipping`)
    return
  }

  const firstName = lead.name.split(' ')[0]

  // Case 1: Already completed qualification — do nothing
  if (lead.qualificationCompletedAt) {
    console.log(`[ENGAGEMENT] Lead ${leadId} already qualified, no action needed`)
    return
  }

  // Case 2: Started qualification but didn't complete — send reminder
  if (lead.qualificationStartedAt && !lead.qualificationCompletedAt) {
    console.log(`[ENGAGEMENT] Lead ${leadId} started but didn't finish — sending reminder`)
    await smsService.sendReminder(leadId, lead.phone, firstName, lead.qualificationLink)
    return
  }

  // Case 3: Opened link but didn't start the form — send reminder
  if (lead.linkOpenedAt && !lead.qualificationStartedAt) {
    console.log(`[ENGAGEMENT] Lead ${leadId} opened link but didn't start — sending reminder`)
    await smsService.sendReminder(leadId, lead.phone, firstName, lead.qualificationLink)
    return
  }

  // Case 4: Never clicked the link — low-intent followup
  if (!lead.linkOpenedAt) {
    console.log(`[ENGAGEMENT] Lead ${leadId} never clicked link — sending low-intent followup`)
    await smsService.sendFollowupSMS(leadId, lead.phone, firstName, lead.qualificationLink)

    // Move to NURTURE
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: LeadStatus.NURTURE },
    })
  }
}
