export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, unauthorizedResponse } from '@/lib/lead-system/middleware/auth'
import { syncLeadToCRM } from '@/lib/lead-system/services/lead-processor'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await params

    const result = await syncLeadToCRM(id, 'create')

    return NextResponse.json(
      { success: result.success, crmId: result.crmId, error: result.error },
      { status: result.success ? 200 : 400 }
    )
  } catch (error) {
    console.error('[CRM SYNC] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
