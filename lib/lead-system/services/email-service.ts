import prisma from '@/lib/db'
import { config } from '../config'
import { ActivityType, type MessageResult } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sgMail: any = null

function getSendGrid() {
  if (!sgMail && config.sendgrid.apiKey) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const sg = require('@sendgrid/mail')
    sgMail = sg.default || sg
    sgMail.setApiKey(config.sendgrid.apiKey)
  }
  return sgMail
}

async function sendEmail(to: string, subject: string, html: string): Promise<MessageResult> {
  const sg = getSendGrid()

  if (!sg) {
    console.log(`[EMAIL SIMULATED] To: ${to} | Subject: ${subject}`)
    return { success: true, messageId: `sim_email_${Date.now()}` }
  }

  try {
    const [response] = await sg.send({
      to,
      from: { email: config.sendgrid.fromEmail, name: config.sendgrid.fromName },
      subject,
      html,
    })
    return { success: true, messageId: response.headers['x-message-id'] as string }
  } catch (error) {
    console.error('[EMAIL ERROR]', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Email send failed',
    }
  }
}

export async function sendQualificationEmail(
  leadId: string,
  email: string,
  name: string,
  qualificationLink: string
): Promise<MessageResult> {
  // Check max email count
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { emailCount: true },
  })
  if (lead && lead.emailCount >= config.followup.maxEmailCount) {
    return { success: false, error: 'Max email count reached' }
  }

  const firstName = name.split(' ')[0]
  const subject = 'Your Yacht Charter Inquiry — Yacht Group International'
  const html = buildQualificationEmailHtml(firstName, qualificationLink)

  const result = await sendEmail(email, subject, html)

  await logEmailActivity(leadId, result, 'qualification_link')

  if (result.success) {
    await prisma.lead.update({
      where: { id: leadId },
      data: { emailCount: { increment: 1 } },
    })
  }

  return result
}

export async function sendFollowupEmail(
  leadId: string,
  email: string,
  name: string,
  qualificationLink: string
): Promise<MessageResult> {
  // Check max email count
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { emailCount: true },
  })
  if (lead && lead.emailCount >= config.followup.maxEmailCount) {
    return { success: false, error: 'Max email count reached' }
  }

  const firstName = name.split(' ')[0]
  const subject = 'Still Interested? Your Charter Awaits — Yacht Group International'
  const html = buildFollowupEmailHtml(firstName, qualificationLink)

  const result = await sendEmail(email, subject, html)

  await logEmailActivity(leadId, result, 'followup')

  if (result.success) {
    await prisma.lead.update({
      where: { id: leadId },
      data: { emailCount: { increment: 1 } },
    })
  }

  return result
}

async function logEmailActivity(leadId: string, result: MessageResult, type: string) {
  await prisma.activity.create({
    data: {
      leadId,
      type: result.success ? ActivityType.EMAIL_SENT : ActivityType.EMAIL_FAILED,
      channel: 'email',
      data: JSON.stringify({ type, messageId: result.messageId, error: result.error }),
    },
  })
}

function buildQualificationEmailHtml(firstName: string, link: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0c0c0c;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0c0c0c;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:4px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="background-color:#1a365d;padding:40px 40px 30px;text-align:center;">
          <h1 style="margin:0;color:#c9a96e;font-size:24px;font-weight:300;letter-spacing:2px;">YACHT GROUP INTERNATIONAL</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:3px;">WHERE LUXURY MEETS THE HORIZON</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 20px;color:#f0ebe3;font-size:22px;font-weight:400;">Thank You, ${firstName}</h2>
          <p style="margin:0 0 15px;color:#9e978c;font-size:15px;line-height:1.7;">
            We're delighted by your interest in a luxury yacht experience. Our concierge team is standing by to craft something extraordinary for you.
          </p>
          <p style="margin:0 0 30px;color:#9e978c;font-size:15px;line-height:1.7;">
            To help us prepare the perfect options, please take a moment to share a few details about your ideal charter:
          </p>
          <!-- CTA Button -->
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 30px;">
            <tr><td style="background-color:#c9a96e;border-radius:3px;padding:14px 40px;">
              <a href="${link}" style="color:#1a365d;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">COMPLETE YOUR CHARTER REQUEST</a>
            </td></tr>
          </table>
          <p style="margin:0;color:#9e978c;font-size:13px;line-height:1.6;text-align:center;">
            Or copy this link: <a href="${link}" style="color:#c9a96e;">${link}</a>
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:30px 40px;border-top:1px solid rgba(201,169,110,0.15);text-align:center;">
          <p style="margin:0 0 5px;color:#c9a96e;font-size:13px;font-weight:500;">Yacht Group International</p>
          <p style="margin:0;color:#9e978c;font-size:11px;">Where Luxury Meets the Horizon</p>
          <p style="margin:15px 0 0;color:#9e978c;font-size:11px;">3131 NE Seventh Ave, Miami, Florida 33237 | 386-343-1218</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildFollowupEmailHtml(firstName: string, link: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0c0c0c;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0c0c0c;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:4px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="background-color:#1a365d;padding:40px 40px 30px;text-align:center;">
          <h1 style="margin:0;color:#c9a96e;font-size:24px;font-weight:300;letter-spacing:2px;">YACHT GROUP INTERNATIONAL</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:3px;">WHERE LUXURY MEETS THE HORIZON</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 20px;color:#f0ebe3;font-size:22px;font-weight:400;">Your Charter Awaits, ${firstName}</h2>
          <p style="margin:0 0 15px;color:#9e978c;font-size:15px;line-height:1.7;">
            We noticed you haven't had a chance to complete your yacht charter inquiry. No rush — we're here whenever you're ready.
          </p>
          <p style="margin:0 0 30px;color:#9e978c;font-size:15px;line-height:1.7;">
            Your personalized charter request is still waiting for you:
          </p>
          <!-- CTA Button -->
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 30px;">
            <tr><td style="background-color:#c9a96e;border-radius:3px;padding:14px 40px;">
              <a href="${link}" style="color:#1a365d;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">COMPLETE YOUR REQUEST</a>
            </td></tr>
          </table>
          <p style="margin:0;color:#9e978c;font-size:13px;line-height:1.6;text-align:center;">
            Questions? Reply to this email or call us at 386-343-1218.
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:30px 40px;border-top:1px solid rgba(201,169,110,0.15);text-align:center;">
          <p style="margin:0 0 5px;color:#c9a96e;font-size:13px;font-weight:500;">Yacht Group International</p>
          <p style="margin:0;color:#9e978c;font-size:11px;">Where Luxury Meets the Horizon</p>
          <p style="margin:15px 0 0;color:#9e978c;font-size:11px;">3131 NE Seventh Ave, Miami, Florida 33237 | 386-343-1218</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
