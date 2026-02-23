import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        activities: { orderBy: { createdAt: 'desc' }, take: 50 },
        scoreLog: { orderBy: { createdAt: 'desc' }, take: 20 },
      },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error('[LEAD DETAIL] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params
    const body = await request.json()

    // Only allow specific fields to be updated
    const allowedFields = [
      'name', 'phone', 'email', 'status', 'rentalType', 'timeline',
      'budget', 'location', 'guestCount', 'preferredDate', 'specialRequests',
    ]

    const updates: Record<string, unknown> = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: updates,
    })

    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error('[LEAD UPDATE] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
