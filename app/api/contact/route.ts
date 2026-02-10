import { NextRequest, NextResponse } from 'next/server'
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

    // Send email notification
    await sendInquiryNotification({
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
    }).catch(console.error)

    return NextResponse.json(
      { success: true },
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
