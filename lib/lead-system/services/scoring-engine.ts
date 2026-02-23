import prisma from '@/lib/db'
import { config, scoringRules } from '../config'
import { LeadSource, LeadStatus, type ScoreBreakdownItem, type ScoreResult } from '../types'

interface LeadForScoring {
  id: string
  score: number
  status: string
  source: string
  budget?: string | null
  timeline?: string | null
  rentalType?: string | null
  qualificationCompletedAt?: Date | null
}

export async function calculateScore(lead: LeadForScoring): Promise<ScoreResult> {
  const breakdown: ScoreBreakdownItem[] = []
  let score = 0

  // Base score for being captured
  score += scoringRules.leadCaptured
  breakdown.push({ rule: 'leadCaptured', points: scoringRules.leadCaptured, reason: 'Lead captured' })

  // Source scoring
  const sourcePoints = getSourcePoints(lead.source)
  if (sourcePoints !== 0) {
    score += sourcePoints
    breakdown.push({
      rule: `source_${lead.source.toLowerCase()}`,
      points: sourcePoints,
      reason: `Source: ${lead.source}`,
    })
  }

  // Budget scoring (only if qualification data exists)
  if (lead.budget) {
    const budgetValue = parseBudget(lead.budget)
    if (budgetValue !== null) {
      if (budgetValue >= config.scoring.budgetMinimum) {
        score += scoringRules.budgetQualified
        breakdown.push({
          rule: 'budgetQualified',
          points: scoringRules.budgetQualified,
          reason: `Budget $${budgetValue.toLocaleString()} ≥ $${config.scoring.budgetMinimum.toLocaleString()}`,
        })
      } else {
        score += scoringRules.budgetUnqualified
        breakdown.push({
          rule: 'budgetUnqualified',
          points: scoringRules.budgetUnqualified,
          reason: `Budget $${budgetValue.toLocaleString()} < $${config.scoring.budgetMinimum.toLocaleString()}`,
        })
      }
    }
  }

  // Timeline scoring (only if qualification data exists)
  if (lead.timeline) {
    const days = parseTimelineToDays(lead.timeline)
    if (days !== null) {
      if (days <= 7) {
        score += scoringRules.bookingSoon
        breakdown.push({
          rule: 'bookingSoon',
          points: scoringRules.bookingSoon,
          reason: `Timeline ≤ 7 days (${days} days)`,
        })
      } else if (days <= 30) {
        score += scoringRules.bookingMedium
        breakdown.push({
          rule: 'bookingMedium',
          points: scoringRules.bookingMedium,
          reason: `Timeline 8–30 days (${days} days)`,
        })
      } else {
        score += scoringRules.bookingLater
        breakdown.push({
          rule: 'bookingLater',
          points: scoringRules.bookingLater,
          reason: `Timeline 30+ days (${days} days)`,
        })
      }
    }
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score)

  // Determine status based on score
  const status = getStatusFromScore(score)

  // Log score change if different
  if (score !== lead.score) {
    await prisma.scoreLog.create({
      data: {
        leadId: lead.id,
        previousScore: lead.score,
        newScore: score,
        reason: breakdown.map((b) => b.reason).join('; '),
        ruleApplied: breakdown.map((b) => b.rule).join(', '),
      },
    })
  }

  // Log status change if different
  if (status !== lead.status) {
    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: 'STATUS_CHANGED',
        data: JSON.stringify({ from: lead.status, to: status, score }),
      },
    })
  }

  return { score, status, breakdown }
}

function getSourcePoints(source: string): number {
  switch (source) {
    case LeadSource.GOOGLE:
      return scoringRules.sourceGoogle
    case LeadSource.META:
      return scoringRules.sourceMeta
    case LeadSource.TIKTOK:
      return scoringRules.sourceTikTok
    case LeadSource.DIRECT:
      return scoringRules.sourceDirect
    case LeadSource.LANDING:
      return scoringRules.sourceLanding
    default:
      return 0
  }
}

export function parseBudget(budget: string): number | null {
  if (!budget) return null

  // Clean the string
  const cleaned = budget.toLowerCase().replace(/[^0-9.km]/g, '')

  if (!cleaned) return null

  // Handle k/m suffixes
  if (cleaned.endsWith('m')) {
    const val = parseFloat(cleaned.replace('m', ''))
    return isNaN(val) ? null : val * 1_000_000
  }
  if (cleaned.endsWith('k')) {
    const val = parseFloat(cleaned.replace('k', ''))
    return isNaN(val) ? null : val * 1_000
  }

  const val = parseFloat(cleaned)
  return isNaN(val) ? null : val
}

export function parseTimelineToDays(timeline: string): number | null {
  if (!timeline) return null

  const lower = timeline.toLowerCase().trim()

  // Immediate keywords
  if (['asap', 'immediately', 'today', 'now', 'urgent'].some((k) => lower.includes(k))) {
    return 1
  }
  if (['tomorrow'].some((k) => lower.includes(k))) {
    return 1
  }
  if (['this week', 'next few days', 'within a week'].some((k) => lower.includes(k))) {
    return 5
  }
  if (['next week'].some((k) => lower.includes(k))) {
    return 7
  }
  if (['this month', '2 weeks', 'two weeks', 'couple weeks'].some((k) => lower.includes(k))) {
    return 14
  }
  if (['next month', '1 month', 'one month', 'a month'].some((k) => lower.includes(k))) {
    return 30
  }
  if (['2 months', 'two months', 'couple months'].some((k) => lower.includes(k))) {
    return 60
  }
  if (['3 months', 'three months', 'few months'].some((k) => lower.includes(k))) {
    return 90
  }

  // Parse "X days" pattern
  const daysMatch = lower.match(/(\d+)\s*days?/)
  if (daysMatch) return parseInt(daysMatch[1], 10)

  // Parse "X weeks" pattern
  const weeksMatch = lower.match(/(\d+)\s*weeks?/)
  if (weeksMatch) return parseInt(weeksMatch[1], 10) * 7

  // Parse "X months" pattern
  const monthsMatch = lower.match(/(\d+)\s*months?/)
  if (monthsMatch) return parseInt(monthsMatch[1], 10) * 30

  return null
}

function getStatusFromScore(score: number): LeadStatus {
  if (score >= config.scoring.thresholds.hot) return LeadStatus.HOT
  if (score >= config.scoring.thresholds.warm) return LeadStatus.WARM
  return LeadStatus.COLD
}
