import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

interface InquiryEmailData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  service: string
  message: string
}

export async function sendInquiryNotification(data: InquiryEmailData) {
  if (!resend) {
    console.log('Resend not configured, skipping email notification')
    return { success: true, skipped: true }
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'yachtgroupinternational@gmail.com'

  try {
    // Send notification to business
    await resend.emails.send({
      from: 'Yacht Group International <noreply@yachtgroupinternational.com>',
      to: notificationEmail,
      subject: `New Inquiry: ${data.service} - ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${data.service}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    })

    // Send confirmation to user
    await resend.emails.send({
      from: 'Yacht Group International <noreply@yachtgroupinternational.com>',
      to: data.email,
      subject: 'Thank you for your inquiry - Yacht Group International',
      html: `
        <h2>Thank You, ${data.firstName}</h2>
        <p>We have received your inquiry regarding ${data.service}.</p>
        <p>Our concierge team will be in touch within 24 hours to discuss your requirements.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Yacht Group International</strong></p>
        <p>Where Luxury Meets the Horizon</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}
