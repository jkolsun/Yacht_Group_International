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

    // Save to database
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

    // Send email notifications (non-blocking)
    sendInquiryNotification({
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
    }).catch(console.error)

    return NextResponse.json(
      { success: true, id: inquiry.id },
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
