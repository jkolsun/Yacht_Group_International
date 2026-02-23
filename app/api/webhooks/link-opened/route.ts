export const dynamic = 'force-dynamic'

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

    // Only set linkOpenedAt if not already set
    if (!lead.linkOpenedAt) {
      await prisma.lead.update({
        where: { id: lead_id },
        data: { linkOpenedAt: new Date() },
      })

      await prisma.activity.create({
        data: {
          leadId: lead_id,
          type: ActivityType.LINK_OPENED,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[LINK OPENED] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
