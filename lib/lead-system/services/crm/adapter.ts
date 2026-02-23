import { config } from '../../config'
import type { CRMContact, CRMCreateResult, CRMUpdateResult } from '../../types'

export interface ICRMAdapter {
  createContact(contact: CRMContact): Promise<CRMCreateResult>
  updateContact(contactId: string, contact: Partial<CRMContact>): Promise<CRMUpdateResult>
  getContact(contactId: string): Promise<CRMContact | null>
  findContactByPhone(phone: string): Promise<CRMContact | null>
  addNote(contactId: string, note: string): Promise<CRMUpdateResult>
  addTags(contactId: string, tags: string[]): Promise<CRMUpdateResult>
  moveToPipeline(contactId: string, pipelineId: string, stageId: string): Promise<CRMUpdateResult>
}

export async function createCRMAdapter(): Promise<ICRMAdapter> {
  switch (config.crm.type) {
    case 'gohighlevel': {
      const { GoHighLevelAdapter } = await import('./gohighlevel')
      return new GoHighLevelAdapter()
    }
    case 'hubspot': {
      const { HubSpotAdapter } = await import('./hubspot')
      return new HubSpotAdapter()
    }
    case 'mock':
    default: {
      const { MockCRMAdapter } = await import('./mock')
      return new MockCRMAdapter()
    }
  }
}
