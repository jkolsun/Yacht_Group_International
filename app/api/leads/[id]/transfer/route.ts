import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'
import { ActivityType, LeadStatus } from '@/lib/lead-system/types'
import { queueCRMSync } from '@/lib/lead-system/queue'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params

    const lead = await prisma.lead.findUnique({ where: { id } })
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    await prisma.lead.update({
      where: { id },
      data: { status: LeadStatus.HOT },
    })

    await prisma.activity.create({
      data: {
        leadId: id,
        type: ActivityType.TRANSFERRED_TO_SALES,
        data: JSON.stringify({ name: lead.name, score: lead.score }),
      },
    })

    // Push to CRM
    queueCRMSync(id, 'create', 0)

    return NextResponse.json({ success: true, message: 'Lead transferred to sales' })
  } catch (error) {
    console.error('[TRANSFER] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
