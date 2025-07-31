// src/lib/helpers/__tests__/date.helpers.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCurrentDateISO, formatDate, daysBetween, isToday, addDays } from '../date.helpers';

describe('DateHelpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('getCurrentDateISO should return the current date in YYYY-MM-DD format', () => {
    const mockDate = new Date('2025-07-30T10:00:00Z');
    vi.setSystemTime(mockDate);
    expect(getCurrentDateISO()).toBe('2025-07-30');
  });

  it('formatDate should format a date string correctly', () => {
    const dateString = '2023-03-15';

    // ⭐️ CORREGIDO: Para el valor esperado, DEBEMOS forzar UTC para que la prueba sea consistente.
    const expectedEs = new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC', // <-- La clave para que la prueba funcione siempre.
    });
    const expectedEn = new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC', // <-- La clave para que la prueba funcione siempre.
    });

    // Llamamos a la función normalmente. La función se encargará de manejar la UTC.
    expect(
      formatDate(dateString, 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    ).toBe(expectedEs); // Ahora ambos serán '15 mar 2023'
    expect(
      formatDate(dateString, 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    ).toBe(expectedEn);
  });

  it('daysBetween should calculate the difference in days between two dates', () => {
    const date1 = '2023-03-20';
    const date2 = '2023-03-15';
    expect(daysBetween(date1, date2)).toBe(5);

    const date3 = '2023-03-15';
    const date4 = '2023-03-20';
    expect(daysBetween(date3, date4)).toBe(-5);

    const d1 = new Date('2023-03-20');
    const d2 = new Date('2023-03-15');
    expect(daysBetween(d1, d2)).toBe(5);
  });

  it('isToday should return true if the date is today', () => {
    const mockDate = new Date('2025-07-30T10:00:00Z');
    vi.setSystemTime(mockDate);

    expect(isToday('2025-07-30')).toBe(true);
    expect(isToday('2020-01-01')).toBe(false);
  });

  it('addDays should add days to a date and return in ISO format', () => {
    const dateString = '2023-03-15';
    expect(addDays(dateString, 5)).toBe('2023-03-20');
    expect(addDays(dateString, -5)).toBe('2023-03-10');
    expect(addDays('2023-01-30', 5)).toBe('2023-02-04');
    expect(addDays('2023-12-25', 10)).toBe('2024-01-04');
  });
});
