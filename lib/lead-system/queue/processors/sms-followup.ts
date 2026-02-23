import prisma from '@/lib/db'
import { LeadStatus } from '../../types'
import * as smsService from '../../services/sms-service'
import type { SMSFollowupJob } from '../../types'

export async function processSMSFollowup(data: SMSFollowupJob) {
  const { leadId, phone, name, type } = data

  // Fetch lead to check eligibility
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: {
      id: true,
      status: true,
      smsCount: true,
      qualificationLink: true,
      qualificationCompletedAt: true,
    },
  })

  if (!lead) {
    console.log(`[SMS PROCESSOR] Lead ${leadId} not found, skipping`)
    return
  }

  // Don't send to DNC leads
  if (lead.status === LeadStatus.DO_NOT_CONTACT) {
    console.log(`[SMS PROCESSOR] Lead ${leadId} is DO_NOT_CONTACT, skipping`)
    return
  }

  // Don't send if already qualified
  if (lead.qualificationCompletedAt) {
    console.log(`[SMS PROCESSOR] Lead ${leadId} already qualified, skipping`)
    return
  }

  if (!lead.qualificationLink) {
    console.log(`[SMS PROCESSOR] Lead ${leadId} has no qualification link, skipping`)
    return
  }

  switch (type) {
    case 'qualification_link':
      await smsService.sendQualificationLink(leadId, phone, name, lead.qualificationLink)
      break
    case 'followup':
      await smsService.sendFollowupSMS(leadId, phone, name, lead.qualificationLink)
      break
    case 'reminder':
      await smsService.sendReminder(leadId, phone, name, lead.qualificationLink)
      break
  }
}
