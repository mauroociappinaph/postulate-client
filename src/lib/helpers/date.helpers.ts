// src/lib/helpers/date.helpers.ts

/**
 * Devuelve la fecha actual en formato ISO (YYYY-MM-DD).
 * Utiliza toISOString para asegurar un formato consistente sin importar la zona horaria.
 */
export const getCurrentDateISO = (): string => {
  return new Date().toISOString().slice(0, 10);
};

/**
 * ⭐️ CORREGIDO: Formatea una fecha a un string localizado, forzando UTC.
 * @param dateString - La fecha en formato 'YYYY-MM-DD'.
 * @param locale - El código de idioma (ej. 'es-ES', 'en-US').
 * @param options - Opciones de formato para toLocaleDateString.
 */
export const formatDate = (
  dateString: string,
  locale: string,
  options: Intl.DateTimeFormatOptions
): string => {
  // Se interpreta la fecha como UTC
  const date = new Date(dateString + 'T00:00:00');

  // Se especifica timeZone: 'UTC' para que toLocaleDateString no la convierta a la hora local.
  const utcOptions: Intl.DateTimeFormatOptions = { ...options, timeZone: 'UTC' };

  return date.toLocaleDateString(locale, utcOptions);
};

/**
 * Calcula la diferencia en días entre dos fechas.
 * @param date1 - La fecha más reciente (string o Date).
 * @param date2 - La fecha más antigua (string o Date).
 */
export const daysBetween = (date1: string | Date, date2: string | Date): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const oneDay = 1000 * 60 * 60 * 24;
  const differenceMs = d1.getTime() - d2.getTime();
  return Math.round(differenceMs / oneDay);
};

/**
 * Verifica si una fecha dada en formato 'YYYY-MM-DD' es hoy.
 * Compara strings directamente para evitar problemas de zona horaria.
 */
export const isToday = (dateString: string): boolean => {
  return dateString === getCurrentDateISO();
};

/**
 * Agrega un número de días a una fecha y la devuelve en formato ISO (YYYY-MM-DD).
 * @param dateString - La fecha inicial en formato 'YYYY-MM-DD'.
 * @param days - El número de días a agregar (puede ser negativo).
 */
export const addDays = (dateString: string, days: number): string => {
  // Se agrega 'T00:00:00' para asegurar que la fecha se interprete como UTC
  const date = new Date(dateString + 'T00:00:00');
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};
