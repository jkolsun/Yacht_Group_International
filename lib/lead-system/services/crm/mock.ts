import type { ICRMAdapter } from './adapter'
import type { CRMContact, CRMCreateResult, CRMUpdateResult } from '../../types'

const contacts = new Map<string, CRMContact & { id: string; tags: string[]; notes: string[] }>()

export class MockCRMAdapter implements ICRMAdapter {
  async createContact(contact: CRMContact): Promise<CRMCreateResult> {
    const id = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    contacts.set(id, { ...contact, id, tags: contact.tags || [], notes: [] })
    console.log(`[MOCK CRM] Created contact: ${id} — ${contact.name} (${contact.phone})`)
    return { success: true, contactId: id }
  }

  async updateContact(contactId: string, contact: Partial<CRMContact>): Promise<CRMUpdateResult> {
    const existing = contacts.get(contactId)
    if (!existing) return { success: false, error: 'Contact not found' }
    contacts.set(contactId, { ...existing, ...contact, id: contactId, tags: existing.tags, notes: existing.notes })
    console.log(`[MOCK CRM] Updated contact: ${contactId}`)
    return { success: true }
  }

  async getContact(contactId: string): Promise<CRMContact | null> {
    return contacts.get(contactId) || null
  }

  async findContactByPhone(phone: string): Promise<CRMContact | null> {
    const entries = Array.from(contacts.values())
    for (const contact of entries) {
      if (contact.phone === phone) return contact
    }
    return null
  }

  async addNote(contactId: string, note: string): Promise<CRMUpdateResult> {
    const existing = contacts.get(contactId)
    if (!existing) return { success: false, error: 'Contact not found' }
    existing.notes.push(note)
    console.log(`[MOCK CRM] Added note to ${contactId}: ${note.slice(0, 80)}...`)
    return { success: true }
  }

  async addTags(contactId: string, tags: string[]): Promise<CRMUpdateResult> {
    const existing = contacts.get(contactId)
    if (!existing) return { success: false, error: 'Contact not found' }
    existing.tags = Array.from(new Set([...existing.tags, ...tags]))
    console.log(`[MOCK CRM] Added tags to ${contactId}: ${tags.join(', ')}`)
    return { success: true }
  }

  async moveToPipeline(contactId: string, pipelineId: string, stageId: string): Promise<CRMUpdateResult> {
    console.log(`[MOCK CRM] Moved ${contactId} to pipeline ${pipelineId} stage ${stageId}`)
    return { success: true }
  }
}
