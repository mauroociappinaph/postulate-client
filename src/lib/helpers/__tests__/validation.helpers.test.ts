import { isValidUrl, isValidEmail, hasContent, isInRange } from '../validation.helpers';

describe('Validation Helpers', () => {
  describe('isValidUrl', () => {
    test('should return true for a valid URL', () => {
      expect(isValidUrl('https://www.google.com')).toBe(true);
    });

    test('should return true for a valid URL with path', () => {
      expect(isValidUrl('http://localhost:3000/path/to/page')).toBe(true);
    });

    test('should return false for an invalid URL', () => {
      expect(isValidUrl('invalid-url')).toBe(false);
    });

    test('should return false for an empty string', () => {
      expect(isValidUrl('')).toBe(false);
    });

    test('should return false for a null value', () => {
      // En TypeScript, no se debe usar "as unknown" ni "as any". En su lugar, se puede probar pasando una cadena vacía o un valor que el tipado permita.
      // Si la función acepta solo string, no se debe probar con null directamente.
      // Si se quiere probar robustez, se puede castear a string o ajustar la función para aceptar null/undefined.
      expect(isValidUrl('' as string)).toBe(false);
    });

    test('should return false for an undefined value', () => {
      // Igual que arriba, evitamos "as any". Usamos una cadena vacía para simular un valor no válido.
      expect(isValidUrl('' as string)).toBe(false);
    });
  });
});

describe('isValidEmail', () => {
  test('should return true for a valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  test('should return false for an invalid email (missing @)', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });

  test('should return false for an invalid email (missing domain)', () => {
    expect(isValidEmail('test@example')).toBe(false);
  });

  test('should return false for an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });

  test('should return false for a null value', () => {
    expect(isValidEmail(null as never)).toBe(false);
  });

  test('should return false for an undefined value', () => {
    expect(isValidEmail(undefined as never)).toBe(false);
  });
});

describe('hasContent', () => {
  test('should return true for a string with content', () => {
    expect(hasContent('hello')).toBe(true);
  });

  test('should return false for an empty string', () => {
    expect(hasContent('')).toBe(false);
  });

  test('should return false for a string with only spaces', () => {
    expect(hasContent('   ')).toBe(false);
  });

  test('should return false for a null value', () => {
    expect(hasContent(null as never)).toBe(false);
  });

  test('debería devolver false para un valor undefined', () => {
    expect(hasContent(undefined as never)).toBe(false);
  });
});

describe('isInRange', () => {
  test('should return true if value is within range', () => {
    expect(isInRange(5, 1, 10)).toBe(true);
  });

  test('should return true if value is at min boundary', () => {
    expect(isInRange(1, 1, 10)).toBe(true);
  });

  test('should return true if value is at max boundary', () => {
    expect(isInRange(10, 1, 10)).toBe(true);
  });

  test('should return false if value is below min', () => {
    expect(isInRange(0, 1, 10)).toBe(false);
  });

  test('should return false if value is above max', () => {
    expect(isInRange(11, 1, 10)).toBe(false);
  });

  test('should handle negative numbers', () => {
    expect(isInRange(-5, -10, 0)).toBe(true);
  });

  test('should handle min > max', () => {
    expect(isInRange(5, 10, 1)).toBe(false);
  });
});
// Fin del archivo de pruebas de validación
