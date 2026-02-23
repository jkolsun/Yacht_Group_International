export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(todayStart)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    const [
      total,
      byStatus,
      bySource,
      todayCount,
      weekCount,
      avgScore,
      qualified,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.groupBy({ by: ['status'], _count: true }),
      prisma.lead.groupBy({ by: ['source'], _count: true }),
      prisma.lead.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.lead.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.lead.aggregate({ _avg: { score: true } }),
      prisma.lead.count({ where: { qualificationCompletedAt: { not: null } } }),
    ])

    const statusMap = Object.fromEntries(byStatus.map((s) => [s.status, s._count]))
    const sourceMap = Object.fromEntries(bySource.map((s) => [s.source, s._count]))
    const conversionRate = total > 0 ? ((qualified / total) * 100).toFixed(1) : '0'

    return NextResponse.json({
      success: true,
      data: {
        total,
        today: todayCount,
        thisWeek: weekCount,
        byStatus: statusMap,
        bySource: sourceMap,
        averageScore: Math.round(avgScore._avg.score || 0),
        qualified,
        conversionRate: `${conversionRate}%`,
      },
    })
  } catch (error) {
    console.error('[LEADS STATS] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
