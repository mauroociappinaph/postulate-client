// src/lib/helpers/string.helpers.ts

/**
 * Obtiene las iniciales de un nombre.
 * Toma la primera letra de las dos primeras palabras si existen.
 * @param name - El nombre completo.
 * @returns Las iniciales en mayúsculas.
 */
export const getInitials = (name: string | null | undefined): string => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return '';
  }
  const parts = name.trim().split(/\s+/); // Divide por uno o más espacios
  let initials = '';
  if (parts.length > 0 && parts[0].length > 0) {
    initials += parts[0][0].toUpperCase();
  }
  if (parts.length > 1 && parts[1].length > 0) {
    initials += parts[1][0].toUpperCase();
  }
  return initials;
};

/**
 * Capitaliza la primera letra de cada palabra en una cadena.
 * Las demás letras de cada palabra se convierten a minúsculas.
 * @param text - La cadena a capitalizar.
 * @returns La cadena con cada palabra capitalizada.
 */
export const capitalizeWords = (text: string): string => {
  if (!text) {
    return '';
  }
  // This regex matches the first character of each word (\b\w)
  // The replacer function then capitalizes that character and converts the rest of the word to lowercase.
  return text.replace(/\b(\w)(.*?)(\b|$)/g, (_, firstChar, restOfWord) => {
    return firstChar.toUpperCase() + restOfWord.toLowerCase();
  });
};

/**
 * Trunca un texto a una longitud máxima especificada, añadiendo puntos suspensivos si se trunca.
 * La longitud total del texto resultante, incluyendo los puntos suspensivos, no excederá maxLength.
 * @param text - El texto a truncar.
 * @param maxLength - La longitud máxima deseada para el texto truncado (por defecto 100).
 * @returns El texto truncado o el texto original si es más corto que maxLength.
 */
export const truncateText = (text: string | null | undefined, maxLength: number = 100): string => {
  if (text === null || text === undefined) {
    return '';
  }
  const strText = String(text); // Asegura que sea un string

  const ellipsis = '...';
  // Si la longitud original es menor o igual a maxLength, no truncamos
  if (strText.length <= maxLength) {
    return strText;
  }

  // Si maxLength es tan pequeño que no hay espacio para el texto y elipsis
  // Por ejemplo, si maxLength es 1 o 2, solo podemos devolver una parte delipsis.
  if (maxLength < ellipsis.length) {
    return ellipsis.substring(0, maxLength);
  }

  // Calcula la longitud de la parte del texto antes de añadir los puntos suspensivos
  // Esto asegura que el total (truncationLength + ellipsis.length) sea igual a maxLength
  const truncationLength = maxLength - ellipsis.length;

  return strText.substring(0, truncationLength) + ellipsis;
};

/**
 * Convierte una cadena de texto en un "slug" amigable para URL.
 * Reemplaza espacios y caracteres especiales con guiones, y convierte a minúsculas.
 * @param text - La cadena de texto a convertir.
 * @returns El slug generado.
 */
export const slugify = (text: string | null | undefined): string => {
  if (text === null || text === undefined) {
    return '';
  }
  return String(text)
    .normalize('NFD') // Normaliza para descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos (acentos)
    .toLowerCase() // Convierte a minúsculas
    .trim() // Elimina espacios al inicio y al final
    .replace(/\s+/g, '-') // Reemplaza espacios por un solo guion
    .replace(/[^\w-]+/g, '') // Elimina caracteres no alfanuméricos excepto guiones
    .replace(/--+/g, '-'); // Reemplaza múltiples guiones por uno solo
};

/**
 * Normaliza los espacios en una cadena de texto, reemplazando múltiples espacios por uno solo y eliminando espacios al inicio y al final.
 * @param text - La cadena de texto a normalizar.
 * @returns La cadena de texto con espacios normalizados.
 */
export const normalizeSpaces = (text: string | null | undefined): string => {
  if (text === null || text === undefined) {
    return '';
  }
  return String(text).replace(/\s+/g, ' ').trim();
};
