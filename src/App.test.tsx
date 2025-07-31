import { render, screen } from '@testing-library/react';
import App from '@/App';
import { describe, it, expect, vi } from 'vitest';

// Mock the zustand stores
vi.mock('@/store/auth', () => ({
  useAuthStore: vi.fn(() => ({
    user: null,
    loading: true,
    initialize: vi.fn(),
  })),
}));

vi.mock('@/store/theme', () => ({
  useThemeStore: vi.fn(() => ({
    theme: 'light',
    setTheme: vi.fn(),
  })),
}));

describe('App', () => {
  it('should render the loading spinner initially', () => {
    render(<App />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});