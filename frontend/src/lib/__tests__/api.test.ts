import { describe, it, expect, vi, beforeEach } from 'vitest';
import { playbookApi } from '../api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('playbookApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all playbooks successfully', async () => {
      const mockResponse = {
        data: [
          { id: 1, name: 'Test Playbook 1' },
          { id: 2, name: 'Test Playbook 2' }
        ]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await playbookApi.getAll();
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/playbooks');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      } as Response);

      await expect(playbookApi.getAll()).rejects.toThrow('Failed to fetch playbooks');
    });
  });

  describe('getById', () => {
    it('should fetch playbook by id successfully', async () => {
      const mockResponse = {
        data: {
          name: 'Test Playbook',
          start_node: 'start',
          nodes: {}
        },
        raw_data: '# Start\n## Test Node'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await playbookApi.getById('1');
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/playbook/1');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      } as Response);

      await expect(playbookApi.getById('1')).rejects.toThrow('Failed to fetch playbook');
    });
  });

  describe('create', () => {
    it('should create playbook successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true
      } as Response);

      await expect(playbookApi.create()).resolves.not.toThrow();
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/playbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should throw error when creation fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      } as Response);

      await expect(playbookApi.create()).rejects.toThrow('Failed to create playbook');
    });
  });

  describe('update', () => {
    it('should update playbook successfully', async () => {
      const updateData = {
        data: { name: 'Updated Playbook', start: 'start', nodes: {} },
        raw_data: '# Start\n## Updated Node'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true
      } as Response);

      await expect(playbookApi.update('1', updateData)).resolves.not.toThrow();
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/playbook/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
    });

    it('should throw error when update fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      } as Response);

      await expect(playbookApi.update('1', { data: { name: 'Test', start: 'start', nodes: {} }, raw_data: '' })).rejects.toThrow('Failed to update playbook');
    });
  });

  describe('delete', () => {
    it('should delete playbook successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true
      } as Response);

      await expect(playbookApi.delete(1)).resolves.not.toThrow();
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/playbook/1', {
        method: 'DELETE',
      });
    });

    it('should throw error when deletion fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      } as Response);

      await expect(playbookApi.delete(1)).rejects.toThrow('Failed to delete playbook');
    });
  });
}); 