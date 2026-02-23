import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'
import { calculateScore } from '@/lib/lead-system/services/scoring-engine'

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

    const result = await calculateScore(lead)

    await prisma.lead.update({
      where: { id },
      data: { score: result.score, status: result.status },
    })

    return NextResponse.json({
      success: true,
      data: {
        previousScore: lead.score,
        newScore: result.score,
        status: result.status,
        breakdown: result.breakdown,
      },
    })
  } catch (error) {
    console.error('[RESCORE] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
