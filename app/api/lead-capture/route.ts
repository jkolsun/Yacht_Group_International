export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { processLead } from '@/lib/lead-system/services/lead-processor'

const leadCaptureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  rentalType: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = leadCaptureSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data
    const source = data.source || 'LANDING'

    const result = await processLead(source, {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      rentalType: data.rentalType,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
    })

    return NextResponse.json(result, { status: result.success ? 201 : 400 })
  } catch (error) {
    console.error('[LEAD CAPTURE] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
