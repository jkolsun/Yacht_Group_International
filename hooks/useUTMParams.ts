'use client'

import { useState, useEffect } from 'react'

interface UTMParams {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export function useUTMParams(): UTMParams {
  const [params, setParams] = useState<UTMParams>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const searchParams = new URLSearchParams(window.location.search)

    setParams({
      utmSource: searchParams.get('utm_source') || undefined,
      utmMedium: searchParams.get('utm_medium') || undefined,
      utmCampaign: searchParams.get('utm_campaign') || undefined,
    })
  }, [])

  return params
}
