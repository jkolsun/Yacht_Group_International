import prisma from '@/lib/db'
import { config } from '../config'
import { ActivityType, type MessageResult } from '../types'

let twilioClient: ReturnType<typeof createTwilioClient> | null = null

function createTwilioClient() {
  if (config.twilio.accountSid && config.twilio.authToken) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const twilio = require('twilio')
    return twilio(config.twilio.accountSid, config.twilio.authToken)
  }
  return null
}

function getTwilioClient() {
  if (!twilioClient) {
    twilioClient = createTwilioClient()
  }
  return twilioClient
}

async function sendSMS(to: string, body: string): Promise<MessageResult> {
  if (config.smsProvider === 'simulated' || !getTwilioClient()) {
    console.log(`[SMS SIMULATED] To: ${to} | Body: ${body}`)
    return { success: true, messageId: `sim_${Date.now()}` }
  }

  try {
    const message = await getTwilioClient()!.messages.create({
      body,
      to,
      from: config.twilio.phoneNumber,
    })
    return { success: true, messageId: message.sid }
  } catch (error) {
    console.error('[SMS ERROR]', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SMS send failed',
    }
  }
}

export async function sendQualificationLink(
  leadId: string,
  phone: string,
  firstName: string,
  qualificationLink: string
): Promise<MessageResult> {
  const body = `Hi ${firstName}! Thank you for your interest in Yacht Group International. Complete your charter request here: ${qualificationLink} — YGI Concierge`

  const result = await sendSMS(phone, body)

  await logSMSActivity(leadId, result, 'qualification_link')

  if (result.success) {
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        smsCount: { increment: 1 },
        lastContactedAt: new Date(),
        linkDeliveredAt: new Date(),
      },
    })
  }

  return result
}

export async function sendFollowupSMS(
  leadId: string,
  phone: string,
  firstName: string,
  qualificationLink: string
): Promise<MessageResult> {
  // Check max SMS count
  const lead = await prisma.lead.findUnique({ where: { id: leadId }, select: { smsCount: true } })
  if (lead && lead.smsCount >= config.followup.maxSmsCount) {
    console.log(`[SMS] Max SMS count reached for lead ${leadId}`)
    return { success: false, error: 'Max SMS count reached' }
  }

  const body = `Hi ${firstName}, just following up on your yacht charter inquiry. Complete your request here: ${qualificationLink} — Yacht Group International`

  const result = await sendSMS(phone, body)

  await logSMSActivity(leadId, result, 'followup')

  if (result.success) {
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        smsCount: { increment: 1 },
        lastContactedAt: new Date(),
      },
    })
  }

  return result
}

export async function sendReminder(
  leadId: string,
  phone: string,
  firstName: string,
  qualificationLink: string
): Promise<MessageResult> {
  // Check max SMS count
  const lead = await prisma.lead.findUnique({ where: { id: leadId }, select: { smsCount: true } })
  if (lead && lead.smsCount >= config.followup.maxSmsCount) {
    console.log(`[SMS] Max SMS count reached for lead ${leadId}`)
    return { success: false, error: 'Max SMS count reached' }
  }

  const body = `Hi ${firstName}, your yacht charter request is still waiting. Complete it here: ${qualificationLink} — Yacht Group International. Reply STOP to opt out.`

  const result = await sendSMS(phone, body)

  await logSMSActivity(leadId, result, 'reminder')

  if (result.success) {
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        smsCount: { increment: 1 },
        lastContactedAt: new Date(),
      },
    })
  }

  return result
}

async function logSMSActivity(leadId: string, result: MessageResult, type: string) {
  await prisma.activity.create({
    data: {
      leadId,
      type: result.success ? ActivityType.SMS_SENT : ActivityType.SMS_FAILED,
      channel: 'sms',
      data: JSON.stringify({ type, messageId: result.messageId, error: result.error }),
    },
  })
}
