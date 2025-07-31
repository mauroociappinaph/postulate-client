// src/lib/helpers/__tests__/string.helpers.test.ts

import {
  getInitials,
  capitalizeWords,
  truncateText,
  slugify,
  normalizeSpaces,
} from '../string.helpers';

describe('String Helpers', () => {
  describe('getInitials', () => {
    test('should return initials for a single word name', () => {
      expect(getInitials('John')).toBe('J');
    });

    test('should return initials for a two-word name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    test('should return initials for a multi-word name', () => {
      expect(getInitials('John Doe Smith')).toBe('JD');
    });

    test('should handle names with leading/trailing spaces', () => {
      expect(getInitials('  Jane Doe  ')).toBe('JD');
    });

    test('should return empty string for empty input', () => {
      expect(getInitials('')).toBe('');
    });

    test('should return empty string for null input', () => {
      expect(getInitials(null as any)).toBe('');
    });

    test('should return empty string for undefined input', () => {
      expect(getInitials(undefined as any)).toBe('');
    });

    test('should return empty string for non-string input', () => {
      expect(getInitials(123 as any)).toBe('');
    });

    test('should handle names with special characters', () => {
      expect(getInitials('María José')).toBe('MJ');
    });
  });

  describe('capitalizeWords', () => {
    test('should capitalize the first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('should handle single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
    });

    test('should handle empty string', () => {
      expect(capitalizeWords('')).toBe('');
    });

    test('should handle leading/trailing spaces', () => {
      expect(capitalizeWords('  hello world  ')).toBe('  Hello World  ');
    });

    // This test now passes because we fixed the capitalizeWords function to lowercase the rest of the word
    test('should handle words with mixed case', () => {
      expect(capitalizeWords('hELLo wORLd')).toBe('Hello World');
    });

    test('should handle numbers and special characters', () => {
      expect(capitalizeWords('123 test!@#')).toBe('123 Test!@#');
    });
  });

  describe('truncateText', () => {
    test('should truncate text to maxLength with ellipsis', () => {
      expect(truncateText('This is a long text that needs to be truncated.', 20)).toBe(
        'This is a long te...'
      );
    });

    test('should not truncate if text is shorter than maxLength', () => {
      expect(truncateText('Short text', 20)).toBe('Short text');
    });

    test('should handle empty string', () => {
      expect(truncateText('', 20)).toBe('');
    });

    test('should handle null input', () => {
      expect(truncateText(null as never, 20)).toBe('');
    });

    test('should handle undefined input', () => {
      expect(truncateText(undefined as any, 20)).toBe('');
    });

    test('should use default maxLength if not provided', () => {
      const longText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
      // --- FIX IS HERE ---
      // The length should now be exactly 100, as the ellipsis is included *within* the maxLength.
      expect(truncateText(longText).length).toBe(100);
      // And the content should be the first 97 characters + '...'
      expect(truncateText(longText)).toBe(longText.substring(0, 97) + '...');
    });
  });

  describe('slugify', () => {
    test('should convert text to a slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    test('should handle special characters and accents', () => {
      expect(slugify('María José Núñez')).toBe('maria-jose-nunez');
    });

    test('should replace multiple spaces with single hyphen', () => {
      expect(slugify('  hello   world  ')).toBe('hello-world');
    });

    test('should remove non-alphanumeric characters', () => {
      expect(slugify('Hello, World! 123')).toBe('hello-world-123');
    });

    test('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    test('should handle null input', () => {
      expect(slugify(null as any)).toBe('');
    });

    test('should handle undefined input', () => {
      expect(slugify(undefined as any)).toBe('');
    });
  });

  describe('normalizeSpaces', () => {
    test('should replace multiple spaces with single space', () => {
      expect(normalizeSpaces('  hello   world  ')).toBe('hello world');
    });

    test('should trim leading/trailing spaces', () => {
      expect(normalizeSpaces('  hello world  ')).toBe('hello world');
    });

    test('should handle single space', () => {
      expect(normalizeSpaces('hello world')).toBe('hello world');
    });

    test('should handle empty string', () => {
      expect(normalizeSpaces('')).toBe('');
    });

    test('should handle null input', () => {
      expect(normalizeSpaces(null as any)).toBe('');
    });

    test('should handle undefined input', () => {
      expect(normalizeSpaces(undefined as any)).toBe('');
    });
  });
});
