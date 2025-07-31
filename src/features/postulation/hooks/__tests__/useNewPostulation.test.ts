import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNewPostulation } from '../useNewPostulation';
import { postulationsApi } from '../../api/postulations';
import { usePostulationsStore, useLanguageStore, useAuthStore } from '../../../../store';

// Mock the entire store module
vi.mock('../../../../store');
// Mock the api module
vi.mock('../../api/postulations');

describe('useNewPostulation', () => {
  // Define mock functions
  const mockAddPostulation = vi.fn();
  const mockTranslate = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    vi.mocked(useAuthStore).mockReturnValue({ user: { id: 'test-user-id' } } as any);
    vi.mocked(useLanguageStore).mockReturnValue({ translate: mockTranslate } as any);
    vi.mocked(usePostulationsStore).mockImplementation((selector: (state: any) => any) => {
      const state = {
        addPostulation: mockAddPostulation,
      };
      return selector(state);
    });
  });

  it('should handle successful submission', async () => {
    // Arrange
    vi.mocked(postulationsApi.create).mockResolvedValue({} as any);
    mockAddPostulation.mockImplementation(() => {});

    const { result } = renderHook(() => useNewPostulation());

    // Act
    await act(async () => {
      await result.current.handleSubmit({ company: 'Test Co', position: 'Tester' } as any);
    });

    // Assert
    expect(postulationsApi.create).toHaveBeenCalled();
    expect(mockAddPostulation).toHaveBeenCalled();
    expect(result.current.success).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.formError).toBeUndefined();
  });

  it('should handle submission failure and use fallback error message', async () => {
    // Arrange
    const apiError = new Error('API Error');
    vi.mocked(postulationsApi.create).mockRejectedValue(apiError);
    mockTranslate.mockReturnValue(undefined); // Simulate translation not found

    const { result } = renderHook(() => useNewPostulation());

    // Act
    await act(async () => {
      await result.current.handleSubmit({ company: 'Test Co', position: 'Tester' } as any);
    });

    // Assert
    expect(result.current.success).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.formError).toBe('An error occurred while saving the application.');
    expect(mockAddPostulation).not.toHaveBeenCalled();
  });

  it('should handle submission failure and use translated error message', async () => {
    // Arrange
    const apiError = new Error('API Error');
    vi.mocked(postulationsApi.create).mockRejectedValue(apiError);
    const translatedError = 'Translated Error Message';
    mockTranslate.mockReturnValue(translatedError); // Simulate translation found

    const { result } = renderHook(() => useNewPostulation());

    // Act
    await act(async () => {
      await result.current.handleSubmit({ company: 'Test Co', position: 'Tester' } as any);
    });

    // Assert
    expect(result.current.success).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.formError).toBe(translatedError);
  });

  it('should set an error if user is not authenticated', async () => {
    // Arrange
    vi.mocked(useAuthStore).mockReturnValue({ user: null } as any); // No user
    const translatedError = 'User not found';
    mockTranslate.mockReturnValue(translatedError);

    const { result } = renderHook(() => useNewPostulation());

    // Act
    await act(async () => {
      await result.current.handleSubmit({ company: 'Test Co', position: 'Tester' } as any);
    });

    // Assert
    expect(postulationsApi.create).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.formError).toBe(translatedError);
  });
});