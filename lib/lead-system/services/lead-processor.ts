import { v4 as uuidv4 } from 'uuid'
import prisma from '@/lib/db'
import { config } from '../config'
import {
  LeadSource,
  LeadStatus,
  ActivityType,
  type NormalizedLead,
  type MetaLeadPayload,
  type TikTokLeadPayload,
  type GoogleLeadPayload,
  type DirectLeadPayload,
  type QualificationData,
} from '../types'
import { calculateScore } from './scoring-engine'
import * as smsService from './sms-service'
import * as emailService from './email-service'
import { fetchLeadData, getFieldValue } from './meta-graph'
import { createCRMAdapter } from './crm/adapter'
import {
  queueEmailFollowup,
  queueLinkEngagementCheck,
  queueSMSFollowup,
  queueCRMSync,
} from '../queue'

// ============================================================
// Main Pipeline Entry Point
// ============================================================

export async function processLead(
  source: string,
  payload: unknown
): Promise<{ success: boolean; leadId?: string; existing?: boolean; error?: string }> {
  try {
    // 1. Normalize
    const normalized = await normalizeLead(source, payload)
    if (!normalized) {
      return { success: false, error: 'Failed to normalize lead data' }
    }

    // 2. Deduplicate
    const existing = await checkDuplicate(normalized.phone)
    if (existing) {
      console.log(`[LEAD] Duplicate detected: ${normalized.phone} → existing lead ${existing.id}`)
      return { success: true, leadId: existing.id, existing: true }
    }

    // 3. Store in DB
    const lead = await prisma.lead.create({
      data: {
        id: uuidv4(),
        name: normalized.name,
        phone: normalized.phone,
        email: normalized.email,
        source: normalized.source,
        rentalType: normalized.rentalType,
        adId: normalized.adId,
        campaignId: normalized.campaignId,
        utmSource: normalized.utmSource,
        utmMedium: normalized.utmMedium,
        utmCampaign: normalized.utmCampaign,
        score: 10,
        status: LeadStatus.NEW,
      },
    })

    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: ActivityType.LEAD_CREATED,
        data: JSON.stringify({ source: normalized.source, name: normalized.name }),
      },
    })

    // 4. Calculate initial score
    const scoreResult = await calculateScore(lead)
    await prisma.lead.update({
      where: { id: lead.id },
      data: { score: scoreResult.score, status: scoreResult.status },
    })

    // 5. Generate qualification link
    const qualificationLink = generateQualificationLink(lead.id)
    await prisma.lead.update({
      where: { id: lead.id },
      data: { qualificationLink },
    })

    // 6. Send initial confirmations
    await sendInitialConfirmations(lead.id, normalized, qualificationLink)

    // 7. Schedule link engagement check (2 hours)
    queueLinkEngagementCheck(lead.id, 'initial', config.followup.linkEngagementCheckDelayMs)

    console.log(
      `[LEAD] Processed: ${lead.id} | ${normalized.name} | ${normalized.source} | Score: ${scoreResult.score}`
    )

    return { success: true, leadId: lead.id }
  } catch (error) {
    console.error('[LEAD] Processing error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Lead processing failed',
    }
  }
}

// ============================================================
// Normalization
// ============================================================

async function normalizeLead(
  source: string,
  payload: unknown
): Promise<NormalizedLead | null> {
  const sourceUpper = source.toUpperCase()

  switch (sourceUpper) {
    case 'META':
      return normalizeMetaLead(payload as MetaLeadPayload)
    case 'TIKTOK':
      return normalizeTikTokLead(payload as TikTokLeadPayload)
    case 'GOOGLE':
      return normalizeGoogleLead(payload as GoogleLeadPayload)
    case 'DIRECT':
    case 'LANDING':
      return normalizeDirectLead(payload as DirectLeadPayload, sourceUpper as LeadSource)
    default:
      console.error(`[LEAD] Unknown source: ${source}`)
      return null
  }
}

async function normalizeMetaLead(payload: MetaLeadPayload): Promise<NormalizedLead | null> {
  // Real webhook: entry[0].changes[0].value.leadgen_id
  const entry = payload.entry?.[0]
  const change = entry?.changes?.[0]
  const value = change?.value

  if (value?.leadgen_id && !value.field_data) {
    // Real Meta webhook — fetch from Graph API
    const leadData = await fetchLeadData(value.leadgen_id)
    if (!leadData) return null
    return normalizeMetaLeadFromGraphData(leadData, value.leadgen_id)
  }

  // Test data or direct field_data
  const fieldData = value?.field_data || payload.field_data
  if (!fieldData) return null

  const getName = (fd: typeof fieldData) => {
    const f =
      fd.find((f) => f.name === 'full_name') ||
      fd.find((f) => f.name === 'first_name')
    return f?.values?.[0] || 'Unknown'
  }

  const getPhone = (fd: typeof fieldData) => {
    const f = fd.find((f) => f.name === 'phone_number' || f.name === 'phone')
    return f?.values?.[0] || ''
  }

  const getEmail = (fd: typeof fieldData) => {
    const f = fd.find((f) => f.name === 'email')
    return f?.values?.[0]
  }

  const phone = normalizePhone(getPhone(fieldData))
  if (!phone) return null

  return {
    name: getName(fieldData),
    phone,
    email: getEmail(fieldData),
    source: LeadSource.META,
    adId: payload.entry?.[0]?.changes?.[0]?.value?.form_id,
    campaignId: payload.entry?.[0]?.changes?.[0]?.value?.page_id,
  }
}

function normalizeMetaLeadFromGraphData(
  leadData: { field_data: Array<{ name: string; values: string[] }>; id: string },
  leadgenId: string
): NormalizedLead | null {
  const name =
    getFieldValue(leadData, 'full_name') ||
    getFieldValue(leadData, 'first_name') ||
    'Unknown'
  const rawPhone = getFieldValue(leadData, 'phone_number') || ''
  const email = getFieldValue(leadData, 'email')

  const phone = normalizePhone(rawPhone)
  if (!phone) return null

  return {
    name,
    phone,
    email,
    source: LeadSource.META,
    adId: leadgenId,
  }
}

function normalizeTikTokLead(payload: TikTokLeadPayload): NormalizedLead | null {
  const userInfo = payload.user_info
  if (!userInfo) return null

  const phone = normalizePhone(userInfo.phone_number || '')
  if (!phone) return null

  return {
    name: userInfo.full_name || 'Unknown',
    phone,
    email: userInfo.email,
    source: LeadSource.TIKTOK,
    adId: payload.ad_id,
    campaignId: payload.campaign_id,
  }
}

function normalizeGoogleLead(payload: GoogleLeadPayload): NormalizedLead | null {
  const columns = payload.user_column_data || []

  const getColumn = (id: string) => columns.find((c) => c.column_id === id)?.string_value

  const name = getColumn('FULL_NAME') || getColumn('FIRST_NAME') || 'Unknown'
  const rawPhone = getColumn('PHONE_NUMBER') || ''
  const email = getColumn('EMAIL')

  const phone = normalizePhone(rawPhone)
  if (!phone) return null

  return {
    name,
    phone,
    email,
    source: LeadSource.GOOGLE,
    campaignId: payload.campaign_id,
    adId: payload.ad_group_id,
  }
}

function normalizeDirectLead(
  payload: DirectLeadPayload,
  source: LeadSource
): NormalizedLead | null {
  const phone = normalizePhone(payload.phone)
  if (!phone) return null

  return {
    name: payload.name,
    phone,
    email: payload.email,
    source,
    rentalType: payload.rentalType,
    utmSource: payload.utmSource,
    utmMedium: payload.utmMedium,
    utmCampaign: payload.utmCampaign,
  }
}

// ============================================================
// Helpers
// ============================================================

export function normalizePhone(phone: string): string {
  if (!phone) return ''

  // Strip everything except digits and leading +
  let cleaned = phone.replace(/[^0-9+]/g, '')

  // Remove leading + for processing
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.slice(1)
  }

  // If 10 digits, assume US and prepend 1
  if (cleaned.length === 10) {
    cleaned = '1' + cleaned
  }

  // If 11 digits starting with 1, it's US
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return '+' + cleaned
  }

  // For other lengths, just prepend + if we have enough digits
  if (cleaned.length >= 10) {
    return '+' + cleaned
  }

  return ''
}

function generateQualificationLink(leadId: string): string {
  return `${config.followup.qualificationLinkBaseUrl}?lid=${leadId}`
}

async function checkDuplicate(phone: string) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

  return prisma.lead.findFirst({
    where: {
      phone,
      createdAt: { gte: twentyFourHoursAgo },
    },
    orderBy: { createdAt: 'desc' },
  })
}

async function sendInitialConfirmations(
  leadId: string,
  normalized: NormalizedLead,
  qualificationLink: string
) {
  const firstName = normalized.name.split(' ')[0]

  // SMS: send immediately (0ms delay)
  await smsService.sendQualificationLink(leadId, normalized.phone, firstName, qualificationLink)

  // Email: queue for 3-minute delay (only if email was captured)
  if (normalized.email) {
    queueEmailFollowup(
      leadId,
      normalized.email,
      normalized.name,
      'qualification_link',
      config.followup.initialEmailDelayMs
    )
  }
}

// ============================================================
// Qualification Complete Handler
// ============================================================

export async function handleQualificationComplete(
  leadId: string,
  data: QualificationData
): Promise<{ success: boolean; score?: number; status?: string; error?: string }> {
  try {
    // Update lead with qualification data
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        rentalType: data.rentalType,
        timeline: data.timeline,
        budget: data.budget,
        location: data.location,
        guestCount: data.guestCount,
        preferredDate: data.preferredDate,
        specialRequests: data.specialRequests,
        qualificationCompletedAt: new Date(),
      },
    })

    await prisma.activity.create({
      data: {
        leadId,
        type: ActivityType.QUALIFICATION_COMPLETED,
        data: JSON.stringify(data),
      },
    })

    // Re-score with qualification data
    const scoreResult = await calculateScore(lead)
    await prisma.lead.update({
      where: { id: leadId },
      data: { score: scoreResult.score, status: scoreResult.status },
    })

    // Route based on new score
    if (scoreResult.status === LeadStatus.HOT) {
      await pushToCRM(lead.id)
      await notifySales(lead.id)
    } else if (scoreResult.status === LeadStatus.WARM) {
      await startNurtureSequence(lead.id)
    }
    // COLD: just log and archive — already handled by status update

    return { success: true, score: scoreResult.score, status: scoreResult.status }
  } catch (error) {
    console.error('[LEAD] Qualification complete error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Qualification processing failed',
    }
  }
}

// ============================================================
// CRM + Routing
// ============================================================

async function pushToCRM(leadId: string) {
  queueCRMSync(leadId, 'create', 0)
}

async function notifySales(leadId: string) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  if (!lead) return

  await prisma.activity.create({
    data: {
      leadId,
      type: ActivityType.TRANSFERRED_TO_SALES,
      data: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        score: lead.score,
        budget: lead.budget,
        timeline: lead.timeline,
      }),
    },
  })

  console.log(
    `[HOT LEAD] 🔥 ${lead.name} | Score: ${lead.score} | Budget: ${lead.budget} | Phone: ${lead.phone}`
  )
}

async function startNurtureSequence(leadId: string) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  if (!lead || !lead.qualificationLink) return

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: LeadStatus.NURTURE },
  })

  const firstName = lead.name.split(' ')[0]

  // Queue reminder SMS
  queueSMSFollowup(
    leadId,
    lead.phone,
    firstName,
    'reminder',
    60 * 60 * 1000 // 1 hour delay for nurture SMS
  )

  // Queue follow-up email
  if (lead.email) {
    queueEmailFollowup(
      leadId,
      lead.email,
      lead.name,
      'followup',
      2 * 60 * 60 * 1000 // 2 hour delay for nurture email
    )
  }
}

// ============================================================
// CRM Sync (called by queue processor)
// ============================================================

export async function syncLeadToCRM(
  leadId: string,
  action: 'create' | 'update'
): Promise<{ success: boolean; crmId?: string; error?: string }> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  if (!lead) return { success: false, error: 'Lead not found' }

  try {
    const adapter = await createCRMAdapter()

    const crmContact = {
      name: lead.name,
      phone: lead.phone,
      email: lead.email || undefined,
      source: lead.source,
      score: lead.score,
      status: lead.status,
      rentalType: lead.rentalType || undefined,
      timeline: lead.timeline || undefined,
      budget: lead.budget || undefined,
      location: lead.location || undefined,
      guestCount: lead.guestCount || undefined,
      tags: [
        'yacht-lead',
        `source-${lead.source.toLowerCase()}`,
        ...(lead.status === LeadStatus.HOT ? ['hot-lead'] : []),
      ],
      customFields: {
        lead_id: lead.id,
        qualification_completed: lead.qualificationCompletedAt ? 'yes' : 'no',
      },
    }

    let result
    if (action === 'create' || !lead.crmId) {
      // Check for existing contact first
      const existing = await adapter.findContactByPhone(lead.phone)
      if (existing?.id) {
        result = await adapter.updateContact(existing.id, crmContact)
        if (result.success) {
          await prisma.lead.update({
            where: { id: leadId },
            data: { crmId: existing.id, crmSyncedAt: new Date(), crmStatus: 'synced' },
          })
        }
      } else {
        const createResult = await adapter.createContact(crmContact)
        result = createResult
        if (createResult.success && createResult.contactId) {
          await prisma.lead.update({
            where: { id: leadId },
            data: {
              crmId: createResult.contactId,
              crmSyncedAt: new Date(),
              crmStatus: 'synced',
            },
          })

          // Add tags and notes
          await adapter.addTags(createResult.contactId, crmContact.tags)
          await adapter.addNote(
            createResult.contactId,
            `Yacht Lead — Score: ${lead.score} | Status: ${lead.status} | Source: ${lead.source} | Charter Type: ${lead.rentalType || 'N/A'} | Budget: ${lead.budget || 'N/A'} | Timeline: ${lead.timeline || 'N/A'}`
          )
        }
      }
    } else {
      result = await adapter.updateContact(lead.crmId, crmContact)
      if (result.success) {
        await prisma.lead.update({
          where: { id: leadId },
          data: { crmSyncedAt: new Date(), crmStatus: 'synced' },
        })
      }
    }

    await prisma.activity.create({
      data: {
        leadId,
        type: result?.success ? ActivityType.CRM_SYNCED : ActivityType.CRM_SYNC_FAILED,
        data: JSON.stringify({ action, error: result && 'error' in result ? result.error : undefined }),
      },
    })

    return {
      success: result?.success || false,
      crmId: lead.crmId || undefined,
      error: result && 'error' in result ? result.error : undefined,
    }
  } catch (error) {
    await prisma.activity.create({
      data: {
        leadId,
        type: ActivityType.CRM_SYNC_FAILED,
        data: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      },
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CRM sync failed',
    }
  }
}
