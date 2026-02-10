import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendInquiryNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, service, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let inquiryId = null

    // Save to database if available
    if (prisma) {
      try {
        const inquiry = await prisma.inquiry.create({
          data: {
            firstName,
            lastName,
            email,
            phone: phone || null,
            service,
            message,
          },
        })
        inquiryId = inquiry.id
      } catch (dbError) {
        console.error('Database save failed:', dbError)
        // Continue without database - email will still be sent
      }
    }

    // Send email notifications
    await sendInquiryNotification({
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
    }).catch(console.error)

    return NextResponse.json(
      { success: true, id: inquiryId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to process inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
