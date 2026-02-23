import { config } from '../config'
import type { MetaLeadData } from '../types'

export async function fetchLeadData(leadgenId: string): Promise<MetaLeadData | null> {
  if (!config.meta.accessToken) {
    console.error('[META GRAPH] No access token configured')
    return null
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${leadgenId}?access_token=${config.meta.accessToken}`
    )

    if (!response.ok) {
      console.error(`[META GRAPH] API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    return data as MetaLeadData
  } catch (error) {
    console.error('[META GRAPH] Failed to fetch lead data:', error)
    return null
  }
}

export function getFieldValue(
  leadData: MetaLeadData,
  fieldName: string
): string | undefined {
  const field = leadData.field_data?.find(
    (f) => f.name.toLowerCase() === fieldName.toLowerCase()
  )
  return field?.values?.[0]
}
