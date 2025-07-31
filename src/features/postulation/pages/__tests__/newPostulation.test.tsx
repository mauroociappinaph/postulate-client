
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NuevaPostulacionPage from '../newPostulation';

// Mock the custom hook
vi.mock('../hooks/useNewPostulation', () => ({
  useNewPostulation: () => ({
    loading: false,
    formError: undefined,
    success: false,
    handleSubmit: vi.fn(),
  }),
}));

// Mock the language store
vi.mock('../../../store', () => ({
  useLanguageStore: () => ({
    translate: (key: string) => key, // Simple translation mock
  }),
  useAuthStore: () => ({ user: { id: '123' } }),
}));

describe('NuevaPostulacionPage', () => {
  it('renders the form container', () => {
    render(<NuevaPostulacionPage />);
    expect(screen.getByLabelText(/empresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/puesto/i)).toBeInTheDocument();
  });
});
