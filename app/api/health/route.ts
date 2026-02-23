import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getQueueStats } from '@/lib/lead-system/queue'
import { config } from '@/lib/lead-system/config'

export async function GET() {
  const checks: Record<string, unknown> = {}

  // Database check
  try {
    await prisma.$queryRaw`SELECT 1`
    checks.database = { status: 'connected' }
  } catch (error) {
    checks.database = {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown',
    }
  }

  // Queue stats
  try {
    const stats = await getQueueStats()
    checks.queues = { status: 'connected', stats }
  } catch (error) {
    checks.queues = {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown',
    }
  }

  // Service config
  checks.services = {
    sms: config.smsProvider === 'simulated' ? 'simulated' : 'configured',
    email: config.sendgrid.apiKey ? 'configured' : 'simulated',
    crm: config.crm.type,
    meta: config.meta.accessToken ? 'configured' : 'not configured',
  }

  const allHealthy =
    (checks.database as { status: string }).status === 'connected' &&
    (checks.queues as { status: string }).status === 'connected'

  return NextResponse.json(
    {
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      checks,
    },
    { status: allHealthy ? 200 : 503 }
  )
}
