// ============================================================
// Lead System Types — Yacht Group International
// ============================================================

// --- Enums ---

export enum LeadSource {
  META = 'META',
  GOOGLE = 'GOOGLE',
  TIKTOK = 'TIKTOK',
  DIRECT = 'DIRECT',
  LANDING = 'LANDING',
}

export enum LeadStatus {
  NEW = 'NEW',
  HOT = 'HOT',
  WARM = 'WARM',
  COLD = 'COLD',
  NURTURE = 'NURTURE',
  CONVERTED = 'CONVERTED',
  DO_NOT_CONTACT = 'DO_NOT_CONTACT',
  ARCHIVED = 'ARCHIVED',
}

export enum ActivityType {
  LEAD_CREATED = 'LEAD_CREATED',
  SMS_SENT = 'SMS_SENT',
  SMS_FAILED = 'SMS_FAILED',
  EMAIL_SENT = 'EMAIL_SENT',
  EMAIL_FAILED = 'EMAIL_FAILED',
  LINK_OPENED = 'LINK_OPENED',
  QUALIFICATION_STARTED = 'QUALIFICATION_STARTED',
  QUALIFICATION_COMPLETED = 'QUALIFICATION_COMPLETED',
  SCORE_UPDATED = 'SCORE_UPDATED',
  STATUS_CHANGED = 'STATUS_CHANGED',
  CRM_SYNCED = 'CRM_SYNCED',
  CRM_SYNC_FAILED = 'CRM_SYNC_FAILED',
  TRANSFERRED_TO_SALES = 'TRANSFERRED_TO_SALES',
  NOTE = 'NOTE',
}

// --- Normalized Lead (common shape after normalization) ---

export interface NormalizedLead {
  name: string
  phone: string
  email?: string
  source: LeadSource
  rentalType?: string
  adId?: string
  campaignId?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

// --- Scoring ---

export interface ScoreBreakdownItem {
  rule: string
  points: number
  reason: string
}

export interface ScoreResult {
  score: number
  status: LeadStatus
  breakdown: ScoreBreakdownItem[]
}

// --- CRM ---

export interface CRMContact {
  id?: string
  name: string
  phone: string
  email?: string
  source: string
  score: number
  status: string
  rentalType?: string
  timeline?: string
  budget?: string
  location?: string
  guestCount?: string
  tags: string[]
  customFields: Record<string, string>
}

export interface CRMCreateResult {
  success: boolean
  contactId?: string
  error?: string
}

export interface CRMUpdateResult {
  success: boolean
  error?: string
}

// --- Messaging ---

export interface SMSMessage {
  to: string
  body: string
}

export interface EmailMessage {
  to: string
  subject: string
  html: string
  from?: string
}

export interface MessageResult {
  success: boolean
  messageId?: string
  error?: string
}

// --- Source-specific Payloads ---

export interface MetaLeadPayload {
  entry?: Array<{
    changes?: Array<{
      value?: {
        leadgen_id?: string
        page_id?: string
        form_id?: string
        field_data?: Array<{
          name: string
          values: string[]
        }>
      }
    }>
  }>
  // Direct test data format
  leadgen_id?: string
  field_data?: Array<{
    name: string
    values: string[]
  }>
}

export interface MetaLeadData {
  id: string
  field_data: Array<{
    name: string
    values: string[]
  }>
}

export interface TikTokLeadPayload {
  event?: string
  user_info?: {
    full_name?: string
    phone_number?: string
    email?: string
  }
  ad_id?: string
  campaign_id?: string
}

export interface GoogleLeadPayload {
  lead_id?: string
  user_column_data?: Array<{
    column_id: string
    string_value?: string
  }>
  campaign_id?: string
  ad_group_id?: string
}

export interface DirectLeadPayload {
  name: string
  phone: string
  email?: string
  rentalType?: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

// --- Queue Job Types ---

export interface SMSFollowupJob {
  leadId: string
  phone: string
  name: string
  type: 'qualification_link' | 'followup' | 'reminder'
}

export interface EmailFollowupJob {
  leadId: string
  email: string
  name: string
  type: 'qualification_link' | 'followup'
}

export interface CRMSyncJob {
  leadId: string
  action: 'create' | 'update'
}

export interface LinkEngagementJob {
  leadId: string
  checkType: 'initial'
}

// --- API Response Types ---

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// --- Qualification Form Data ---

export interface QualificationData {
  rentalType: string
  timeline: string
  budget: string
  location: string
  guestCount: string
  preferredDate?: string
  specialRequests?: string
}
