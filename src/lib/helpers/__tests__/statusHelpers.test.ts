import {
  getStatusBackgroundColor,
  getStatusClasses,
  getStatusLabel,
  getStatusTextColor,
} from '../status.helpers';

describe('statusHelpers', () => {
  // --- Pruebas para getStatusLabel ---
  describe('getStatusLabel', () => {
    test('debería traducir estados conocidos al español', () => {
      expect(getStatusLabel('applied')).toBe('Aplicado');
      expect(getStatusLabel('interview')).toBe('Entrevista');
      expect(getStatusLabel('technical')).toBe('Prueba Técnica');
      expect(getStatusLabel('offer')).toBe('Oferta');
      expect(getStatusLabel('rejected')).toBe('Rechazado');
      expect(getStatusLabel('accepted')).toBe('Aceptado');
    });

    test('debería devolver el mismo estado si no es conocido', () => {
      expect(getStatusLabel('unknown_status')).toBe('unknown_status');
      expect(getStatusLabel('pending')).toBe('pending');
      expect(getStatusLabel('')).toBe(''); // Prueba con cadena vacía
    });
  });

  // --- Pruebas para getStatusBackgroundColor ---
  describe('getStatusBackgroundColor', () => {
    test('debería devolver la clase de fondo correcta para estados conocidos', () => {
      expect(getStatusBackgroundColor('applied')).toBe('bg-blue-100');
      expect(getStatusBackgroundColor('interview')).toBe('bg-purple-100');
      expect(getStatusBackgroundColor('technical')).toBe('bg-orange-100');
      expect(getStatusBackgroundColor('offer')).toBe('bg-teal-100');
      expect(getStatusBackgroundColor('rejected')).toBe('bg-red-100');
      expect(getStatusBackgroundColor('accepted')).toBe('bg-green-100');
    });

    test('debería devolver "bg-gray-100" para estados desconocidos', () => {
      expect(getStatusBackgroundColor('unknown_status')).toBe('bg-gray-100');
      expect(getStatusBackgroundColor('pending')).toBe('bg-gray-100');
      expect(getStatusBackgroundColor('')).toBe('bg-gray-100'); // Prueba con cadena vacía
    });
  });

  // --- Pruebas para getStatusTextColor ---
  describe('getStatusTextColor', () => {
    test('debería devolver la clase de color de texto correcta para estados conocidos', () => {
      expect(getStatusTextColor('applied')).toBe('text-blue-700');
      expect(getStatusTextColor('interview')).toBe('text-purple-700');
      expect(getStatusTextColor('technical')).toBe('text-orange-700');
      expect(getStatusTextColor('offer')).toBe('text-teal-700');
      expect(getStatusTextColor('rejected')).toBe('text-red-700');
      expect(getStatusTextColor('accepted')).toBe('text-green-700');
    });

    test('debería devolver "text-gray-700" para estados desconocidos', () => {
      expect(getStatusTextColor('unknown_status')).toBe('text-gray-700');
      expect(getStatusTextColor('pending')).toBe('text-gray-700');
      expect(getStatusTextColor('')).toBe('text-gray-700'); // Prueba con cadena vacía
    });
  });

  // --- Pruebas para getStatusClasses ---
  describe('getStatusClasses', () => {
    test('debería combinar las clases de fondo y texto correctamente para estados conocidos', () => {
      expect(getStatusClasses('applied')).toBe('bg-blue-100 text-blue-700');
      expect(getStatusClasses('interview')).toBe('bg-purple-100 text-purple-700');
      expect(getStatusClasses('technical')).toBe('bg-orange-100 text-orange-700');
      expect(getStatusClasses('offer')).toBe('bg-teal-100 text-teal-700');
      expect(getStatusClasses('rejected')).toBe('bg-red-100 text-red-700');
      expect(getStatusClasses('accepted')).toBe('bg-green-100 text-green-700');
    });

    test('debería combinar las clases de fondo y texto por defecto para estados desconocidos', () => {
      expect(getStatusClasses('unknown_status')).toBe('bg-gray-100 text-gray-700');
      expect(getStatusClasses('pending')).toBe('bg-gray-100 text-gray-700');
      expect(getStatusClasses('')).toBe('bg-gray-100 text-gray-700'); // Prueba con cadena vacía
    });
  });
});
