import { syncLeadToCRM } from '../../services/lead-processor'
import type { CRMSyncJob } from '../../types'

export async function processCRMSync(data: CRMSyncJob) {
  const { leadId, action } = data

  console.log(`[CRM PROCESSOR] Syncing lead ${leadId} (action: ${action})`)

  const result = await syncLeadToCRM(leadId, action)

  if (result.success) {
    console.log(`[CRM PROCESSOR] Successfully synced lead ${leadId} → CRM ID: ${result.crmId}`)
  } else {
    console.error(`[CRM PROCESSOR] Failed to sync lead ${leadId}: ${result.error}`)
    throw new Error(result.error || 'CRM sync failed') // Bull will retry
  }
}
