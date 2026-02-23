import { NextRequest, NextResponse } from 'next/server'
import { config } from '../config'

export function validateApiKey(request: NextRequest): boolean {
  const apiKey =
    request.headers.get('x-api-key') ||
    new URL(request.url).searchParams.get('api_key')

  return apiKey === config.apiKey
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export function validateMetaWebhookGet(request: NextRequest): NextResponse | null {
  const url = new URL(request.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === config.meta.verifyToken) {
    console.log('[META WEBHOOK] Verification successful')
    return new NextResponse(challenge, { status: 200 })
  }

  console.log('[META WEBHOOK] Verification failed')
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

export function validateTikTokWebhookGet(request: NextRequest): NextResponse | null {
  const url = new URL(request.url)
  const challenge = url.searchParams.get('challenge')

  if (challenge) {
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Missing challenge' }, { status: 400 })
}
