import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'
import { processLead } from '@/lib/lead-system/services/lead-processor'

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()
    const source =
      request.headers.get('x-lead-source') || body.source || 'DIRECT'

    const result = await processLead(source, body)

    return NextResponse.json(result, { status: result.success ? 200 : 400 })
  } catch (error) {
    console.error('[WEBHOOK] Lead intake error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
