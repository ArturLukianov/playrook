const API_BASE_URL = 'http://localhost:8080';

export interface PlaybookEntry {
  id: number;
  name: string;
}

import { Playbook } from './types';

export interface PlaybookData {
  data: Playbook;
  raw_data: string;
}

export interface PlaybookResponse {
  data: PlaybookEntry[];
}

// Generic fetcher for SWR
export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(res => res.json());

// Playbook API functions
export const playbookApi = {
  // Get all playbooks
  getAll: async (): Promise<PlaybookResponse> => {
    const response = await fetch(`${API_BASE_URL}/playbooks`);
    if (!response.ok) {
      throw new Error('Failed to fetch playbooks');
    }
    return response.json();
  },

  // Get a single playbook by ID
  getById: async (id: string): Promise<PlaybookData> => {
    const response = await fetch(`${API_BASE_URL}/playbook/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch playbook');
    }
    return response.json();
  },

  // Create a new playbook
  create: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/playbook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to create playbook');
    }
  },

  // Update a playbook
  update: async (
    id: string,
    data: { data: Playbook; raw_data: string }
  ): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/playbook/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update playbook');
    }
  },

  // Delete a playbook
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/playbook/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete playbook');
    }
  },
};
