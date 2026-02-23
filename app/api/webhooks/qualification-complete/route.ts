export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { handleQualificationComplete } from '@/lib/lead-system/services/lead-processor'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      lead_id,
      rental_type,
      timeline,
      budget,
      location,
      guest_count,
      preferred_date,
      special_requests,
    } = body

    if (!lead_id) {
      return NextResponse.json({ error: 'lead_id required' }, { status: 400 })
    }

    const result = await handleQualificationComplete(lead_id, {
      rentalType: rental_type,
      timeline,
      budget,
      location,
      guestCount: guest_count,
      preferredDate: preferred_date,
      specialRequests: special_requests,
    })

    return NextResponse.json(result, { status: result.success ? 200 : 400 })
  } catch (error) {
    console.error('[QUALIFICATION COMPLETE] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
