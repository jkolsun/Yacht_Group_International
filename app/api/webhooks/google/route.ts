export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'
import { processLead } from '@/lib/lead-system/services/lead-processor'

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()

    console.log('[GOOGLE WEBHOOK] Received payload:', JSON.stringify(body).slice(0, 500))

    const result = await processLead('GOOGLE', body)

    return NextResponse.json(result, { status: result.success ? 200 : 400 })
  } catch (error) {
    console.error('[GOOGLE WEBHOOK] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
