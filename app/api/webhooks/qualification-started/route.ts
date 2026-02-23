import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { ActivityType } from '@/lib/lead-system/types'

export async function POST(request: NextRequest) {
  try {
    const { lead_id } = await request.json()

    if (!lead_id) {
      return NextResponse.json({ error: 'lead_id required' }, { status: 400 })
    }

    const lead = await prisma.lead.findUnique({ where: { id: lead_id } })
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const updates: Record<string, Date> = {}

    // Set linkOpenedAt if not already set (they had to open the link to start)
    if (!lead.linkOpenedAt) {
      updates.linkOpenedAt = new Date()
    }

    // Set qualificationStartedAt if not already set
    if (!lead.qualificationStartedAt) {
      updates.qualificationStartedAt = new Date()
    }

    if (Object.keys(updates).length > 0) {
      await prisma.lead.update({
        where: { id: lead_id },
        data: updates,
      })

      await prisma.activity.create({
        data: {
          leadId: lead_id,
          type: ActivityType.QUALIFICATION_STARTED,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[QUALIFICATION STARTED] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
