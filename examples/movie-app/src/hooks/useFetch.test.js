import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useFetch } from './useFetch';

describe('useFetch', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = { title: 'Test Movie', id: 1 };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('/api/movies/1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetch('/api/movies/1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Network error');
  });

  it('should handle HTTP errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch('/api/movies/999'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toContain('404');
  });

  it('should not fetch if url is null', () => {
    const { result } = renderHook(() => useFetch(null));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should cancel fetch on unmount', async () => {
    const mockData = { title: 'Test Movie' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        // Simulate slow response
        await new Promise(resolve => setTimeout(resolve, 100));
        return mockData;
      },
    });

    const { result, unmount } = renderHook(() => useFetch('/api/movies/1'));

    expect(result.current.loading).toBe(true);
    
    // Unmount before fetch completes
    unmount();

    // Wait a bit to ensure fetch would have completed
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // State should not have been updated after unmount
    expect(result.current.loading).toBe(true);
  });
});
