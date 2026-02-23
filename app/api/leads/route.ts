import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = Math.min(parseInt(url.searchParams.get('pageSize') || '20', 10), 100)
    const status = url.searchParams.get('status')
    const source = url.searchParams.get('source')
    const minScore = url.searchParams.get('minScore')
    const maxScore = url.searchParams.get('maxScore')
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    const search = url.searchParams.get('search')

    // Build where clause
    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (source) where.source = source
    if (minScore || maxScore) {
      where.score = {
        ...(minScore ? { gte: parseInt(minScore, 10) } : {}),
        ...(maxScore ? { lte: parseInt(maxScore, 10) } : {}),
      }
    }
    if (startDate || endDate) {
      where.createdAt = {
        ...(startDate ? { gte: new Date(startDate) } : {}),
        ...(endDate ? { lte: new Date(endDate) } : {}),
      }
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          source: true,
          score: true,
          status: true,
          rentalType: true,
          budget: true,
          timeline: true,
          createdAt: true,
          qualificationCompletedAt: true,
          crmSyncedAt: true,
        },
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('[LEADS] List error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
