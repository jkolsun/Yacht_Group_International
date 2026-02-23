import { NextRequest, NextResponse } from 'next/server'
import { validateMetaWebhookGet } from '@/lib/lead-system/middleware/auth'
import { processLead } from '@/lib/lead-system/services/lead-processor'

export async function GET(request: NextRequest) {
  return validateMetaWebhookGet(request) || NextResponse.json({ error: 'Bad request' }, { status: 400 })
}

export async function POST(request: NextRequest) {
  // Always return 200 to Meta — even on errors
  try {
    const body = await request.json()

    console.log('[META WEBHOOK] Received payload:', JSON.stringify(body).slice(0, 500))

    const result = await processLead('META', body)

    console.log('[META WEBHOOK] Result:', result)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[META WEBHOOK] Error:', error)
    // Always 200 for Meta — they'll stop sending if they get errors
    return NextResponse.json({ success: true }, { status: 200 })
  }
}
