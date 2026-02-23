import { config } from '../../config'
import type { ICRMAdapter } from './adapter'
import type { CRMContact, CRMCreateResult, CRMUpdateResult } from '../../types'

const GHL_BASE_URL = 'https://services.leadconnectorhq.com'

export class GoHighLevelAdapter implements ICRMAdapter {
  private headers: Record<string, string>

  constructor() {
    this.headers = {
      Authorization: `Bearer ${config.crm.ghl.apiKey}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    }
  }

  async createContact(contact: CRMContact): Promise<CRMCreateResult> {
    try {
      const nameParts = contact.name.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || ''

      const body = {
        locationId: config.crm.ghl.locationId,
        firstName,
        lastName,
        phone: contact.phone,
        email: contact.email,
        tags: contact.tags,
        customFields: [
          { key: 'lead_score', field_value: String(contact.score) },
          { key: 'lead_status', field_value: contact.status },
          { key: 'lead_source', field_value: contact.source },
          ...(contact.rentalType ? [{ key: 'charter_type', field_value: contact.rentalType }] : []),
          ...(contact.timeline ? [{ key: 'timeline', field_value: contact.timeline }] : []),
          ...(contact.budget ? [{ key: 'budget', field_value: contact.budget }] : []),
          ...(contact.location ? [{ key: 'destination', field_value: contact.location }] : []),
          ...(contact.guestCount ? [{ key: 'guest_count', field_value: contact.guestCount }] : []),
        ],
      }

      const response = await fetch(`${GHL_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorText = await response.text()
        return { success: false, error: `GHL API error: ${response.status} — ${errorText}` }
      }

      const data = await response.json()
      return { success: true, contactId: data.contact?.id }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'GHL create failed',
      }
    }
  }

  async updateContact(contactId: string, contact: Partial<CRMContact>): Promise<CRMUpdateResult> {
    try {
      const body: Record<string, unknown> = {}
      if (contact.name) {
        const parts = contact.name.split(' ')
        body.firstName = parts[0]
        body.lastName = parts.slice(1).join(' ')
      }
      if (contact.phone) body.phone = contact.phone
      if (contact.email) body.email = contact.email
      if (contact.tags) body.tags = contact.tags

      const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorText = await response.text()
        return { success: false, error: `GHL update error: ${response.status} — ${errorText}` }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'GHL update failed',
      }
    }
  }

  async getContact(contactId: string): Promise<CRMContact | null> {
    try {
      const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
        headers: this.headers,
      })
      if (!response.ok) return null
      const data = await response.json()
      const c = data.contact
      return {
        id: c.id,
        name: `${c.firstName || ''} ${c.lastName || ''}`.trim(),
        phone: c.phone,
        email: c.email,
        source: '',
        score: 0,
        status: '',
        tags: c.tags || [],
        customFields: {},
      }
    } catch {
      return null
    }
  }

  async findContactByPhone(phone: string): Promise<CRMContact | null> {
    try {
      const response = await fetch(
        `${GHL_BASE_URL}/contacts/search/duplicate?locationId=${config.crm.ghl.locationId}&phone=${encodeURIComponent(phone)}`,
        { headers: this.headers }
      )
      if (!response.ok) return null
      const data = await response.json()
      if (!data.contact) return null
      return this.getContact(data.contact.id)
    } catch {
      return null
    }
  }

  async addNote(contactId: string, note: string): Promise<CRMUpdateResult> {
    try {
      const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ body: note }),
      })
      return { success: response.ok }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'GHL add note failed',
      }
    }
  }

  async addTags(contactId: string, tags: string[]): Promise<CRMUpdateResult> {
    try {
      const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tags`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ tags }),
      })
      return { success: response.ok }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'GHL add tags failed',
      }
    }
  }

  async moveToPipeline(
    contactId: string,
    pipelineId: string,
    stageId: string
  ): Promise<CRMUpdateResult> {
    try {
      const response = await fetch(`${GHL_BASE_URL}/opportunities/`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          pipelineId,
          stageId,
          contactId,
          name: `Yacht Charter Lead — ${contactId}`,
          status: 'open',
        }),
      })
      return { success: response.ok }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'GHL pipeline move failed',
      }
    }
  }
}
