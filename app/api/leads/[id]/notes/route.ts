export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'
import { ActivityType } from '@/lib/lead-system/types'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params
    const { note } = await request.json()

    if (!note || typeof note !== 'string') {
      return NextResponse.json({ error: 'Note text is required' }, { status: 400 })
    }

    const lead = await prisma.lead.findUnique({ where: { id } })
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const activity = await prisma.activity.create({
      data: {
        leadId: id,
        type: ActivityType.NOTE,
        note,
      },
    })

    return NextResponse.json({ success: true, data: activity }, { status: 201 })
  } catch (error) {
    console.error('[NOTES] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
