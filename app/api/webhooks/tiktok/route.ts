export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateTikTokWebhookGet } from '@/lib/lead-system/middleware/auth'
import { processLead } from '@/lib/lead-system/services/lead-processor'

export async function GET(request: NextRequest) {
  return validateTikTokWebhookGet(request) || NextResponse.json({ error: 'Bad request' }, { status: 400 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('[TIKTOK WEBHOOK] Received payload:', JSON.stringify(body).slice(0, 500))

    const result = await processLead('TIKTOK', body)

    return NextResponse.json(result, { status: result.success ? 200 : 400 })
  } catch (error) {
    console.error('[TIKTOK WEBHOOK] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
