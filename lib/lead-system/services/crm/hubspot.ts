import { config } from '../../config'
import type { ICRMAdapter } from './adapter'
import type { CRMContact, CRMCreateResult, CRMUpdateResult } from '../../types'

const HS_BASE_URL = 'https://api.hubapi.com'

export class HubSpotAdapter implements ICRMAdapter {
  private headers: Record<string, string>

  constructor() {
    this.headers = {
      Authorization: `Bearer ${config.crm.hubspot.apiKey}`,
      'Content-Type': 'application/json',
    }
  }

  async createContact(contact: CRMContact): Promise<CRMCreateResult> {
    try {
      const nameParts = contact.name.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || ''

      const properties: Record<string, string> = {
        firstname: firstName,
        lastname: lastName,
        phone: contact.phone,
        lead_score_ygi: String(contact.score),
        lead_status_ygi: contact.status,
        lead_source_ygi: contact.source,
      }

      if (contact.email) properties.email = contact.email
      if (contact.rentalType) properties.charter_type = contact.rentalType
      if (contact.timeline) properties.charter_timeline = contact.timeline
      if (contact.budget) properties.charter_budget = contact.budget
      if (contact.location) properties.charter_destination = contact.location
      if (contact.guestCount) properties.charter_guest_count = contact.guestCount

      const response = await fetch(`${HS_BASE_URL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ properties }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        return { success: false, error: `HubSpot error: ${response.status} — ${errorText}` }
      }

      const data = await response.json()
      return { success: true, contactId: data.id }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HubSpot create failed',
      }
    }
  }

  async updateContact(contactId: string, contact: Partial<CRMContact>): Promise<CRMUpdateResult> {
    try {
      const properties: Record<string, string> = {}
      if (contact.name) {
        const parts = contact.name.split(' ')
        properties.firstname = parts[0]
        properties.lastname = parts.slice(1).join(' ')
      }
      if (contact.phone) properties.phone = contact.phone
      if (contact.email) properties.email = contact.email
      if (contact.score !== undefined) properties.lead_score_ygi = String(contact.score)
      if (contact.status) properties.lead_status_ygi = contact.status

      const response = await fetch(`${HS_BASE_URL}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ properties }),
      })

      return { success: response.ok }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HubSpot update failed',
      }
    }
  }

  async getContact(contactId: string): Promise<CRMContact | null> {
    try {
      const response = await fetch(
        `${HS_BASE_URL}/crm/v3/objects/contacts/${contactId}?properties=firstname,lastname,phone,email`,
        { headers: this.headers }
      )
      if (!response.ok) return null
      const data = await response.json()
      const p = data.properties
      return {
        id: data.id,
        name: `${p.firstname || ''} ${p.lastname || ''}`.trim(),
        phone: p.phone || '',
        email: p.email,
        source: '',
        score: 0,
        status: '',
        tags: [],
        customFields: {},
      }
    } catch {
      return null
    }
  }

  async findContactByPhone(phone: string): Promise<CRMContact | null> {
    try {
      const response = await fetch(`${HS_BASE_URL}/crm/v3/objects/contacts/search`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [{ propertyName: 'phone', operator: 'EQ', value: phone }],
            },
          ],
        }),
      })
      if (!response.ok) return null
      const data = await response.json()
      if (!data.results?.length) return null
      return this.getContact(data.results[0].id)
    } catch {
      return null
    }
  }

  async addNote(contactId: string, note: string): Promise<CRMUpdateResult> {
    try {
      // Create engagement (note) and associate with contact
      const noteResponse = await fetch(`${HS_BASE_URL}/crm/v3/objects/notes`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          properties: { hs_note_body: note, hs_timestamp: new Date().toISOString() },
          associations: [
            {
              to: { id: contactId },
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
            },
          ],
        }),
      })
      return { success: noteResponse.ok }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HubSpot add note failed',
      }
    }
  }

  async addTags(contactId: string, tags: string[]): Promise<CRMUpdateResult> {
    // HubSpot uses properties for tags — store as semicolon-separated
    try {
      const response = await fetch(`${HS_BASE_URL}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          properties: { ygi_tags: tags.join(';') },
        }),
      })
      return { success: response.ok }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HubSpot add tags failed',
      }
    }
  }

  async moveToPipeline(
    contactId: string,
    pipelineId: string,
    stageId: string
  ): Promise<CRMUpdateResult> {
    try {
      const response = await fetch(`${HS_BASE_URL}/crm/v3/objects/deals`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          properties: {
            dealname: `Yacht Charter Lead — ${contactId}`,
            pipeline: pipelineId,
            dealstage: stageId,
          },
          associations: [
            {
              to: { id: contactId },
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
            },
          ],
        }),
      })
      return { success: response.ok }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HubSpot pipeline move failed',
      }
    }
  }
}
