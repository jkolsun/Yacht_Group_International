// ============================================================
// Lead System Configuration — Yacht Group International
// ============================================================

export const config = {
  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

  // API Security
  apiKey: process.env.LEAD_SYSTEM_API_KEY || 'ygi-dev-key',

  // Twilio SMS
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },
  smsProvider: (process.env.SMS_PROVIDER || 'simulated') as 'twilio' | 'textbelt' | 'simulated',

  // SendGrid Email
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'concierge@yachtgroupinternational.com',
    fromName: process.env.SENDGRID_FROM_NAME || 'Yacht Group International',
  },

  // Meta
  meta: {
    verifyToken: process.env.META_VERIFY_TOKEN || '',
    accessToken: process.env.META_ACCESS_TOKEN || '',
  },

  // CRM
  crm: {
    type: (process.env.CRM_TYPE || 'mock') as 'mock' | 'gohighlevel' | 'hubspot',
    ghl: {
      apiKey: process.env.GHL_API_KEY || '',
      locationId: process.env.GHL_LOCATION_ID || '',
    },
    hubspot: {
      apiKey: process.env.HUBSPOT_API_KEY || '',
    },
  },

  // Scoring
  scoring: {
    thresholds: {
      hot: parseInt(process.env.SCORE_THRESHOLD_HOT || '70', 10),
      warm: parseInt(process.env.SCORE_THRESHOLD_WARM || '40', 10),
    },
    budgetMinimum: parseInt(process.env.BUDGET_MINIMUM_THRESHOLD || '5000', 10),
  },

  // Follow-up timing
  followup: {
    maxSmsCount: 1,
    maxEmailCount: 2,
    qualificationLinkBaseUrl:
      process.env.QUALIFICATION_LINK_BASE_URL || 'https://yachtgroupinternational.com/qualify',
    initialSmsDelayMs: 0,
    initialEmailDelayMs: parseInt(process.env.INITIAL_EMAIL_DELAY_MS || '180000', 10),
    linkEngagementCheckDelayMs: parseInt(
      process.env.LINK_ENGAGEMENT_CHECK_DELAY_MS || '7200000',
      10
    ),
  },
}

export const scoringRules = {
  leadCaptured: 10,
  budgetQualified: 20,
  budgetUnqualified: -20,
  bookingSoon: 20, // ≤ 7 days
  bookingMedium: 10, // 8-30 days
  bookingLater: 0, // 30+ days
  sourceGoogle: 10, // Google = high intent (searched for yacht charter)
  sourceMeta: 5, // Meta = medium intent (clicked ad)
  sourceTikTok: 0, // TikTok = lower intent
  sourceDirect: 0,
  sourceLanding: 0,
  sourceInboundCall: 15,
  declined: -30,
}
