import { renderHook, act } from '@testing-library/react';
import { useErrorHandler } from '../useErrorHandler';

describe('useErrorHandler', () => {
  test('should return null error initially', () => {
    const { result } = renderHook(() => useErrorHandler());
    expect(result.current.error).toBeNull();
  });

  test('should set error message when handleError is called with a custom message', () => {
    const { result } = renderHook(() => useErrorHandler());
    const testError = new Error('Something went wrong');
    const customMessage = 'Custom error message';

    act(() => {
      result.current.handleError(testError, customMessage);
    });

    expect(result.current.error).toBe(customMessage);
  });

  test('should set default error message when handleError is called without a custom message', () => {
    const { result } = renderHook(() => useErrorHandler());
    const testError = new Error('Something went wrong');

    act(() => {
      result.current.handleError(testError);
    });

    expect(result.current.error).toBe('Ha ocurrido un error');
  });

  test('should call onError callback if provided in options', () => {
    const mockOnError = vi.fn();
    const { result } = renderHook(() => useErrorHandler({ onError: mockOnError }));
    const testError = new Error('Something went wrong');

    act(() => {
      result.current.handleError(testError);
    });

    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(testError);
  });

  test('should clear error when clearError is called', () => {
    const { result } = renderHook(() => useErrorHandler());
    const testError = new Error('Something went wrong');

    act(() => {
      result.current.handleError(testError);
    });

    expect(result.current.error).not.toBeNull();

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  test('should use defaultMessage from options if no custom message is provided', () => {
    const defaultMsg = 'An error occurred';
    const { result } = renderHook(() => useErrorHandler({ defaultMessage: defaultMsg }));
    const testError = new Error('Test');

    act(() => {
      result.current.handleError(testError);
    });

    expect(result.current.error).toBe(defaultMsg);
  });

  test('should prioritize custom message over defaultMessage', () => {
    const defaultMsg = 'An error occurred';
    const customMsg = 'Specific error';
    const { result } = renderHook(() => useErrorHandler({ defaultMessage: defaultMsg }));
    const testError = new Error('Test');

    act(() => {
      result.current.handleError(testError, customMsg);
    });

    expect(result.current.error).toBe(customMsg);
  });
});
