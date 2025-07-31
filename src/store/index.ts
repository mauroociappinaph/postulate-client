/**
 * Punto de entrada para todos los stores
 * Exporta todos los stores organizados por dominio
 */

// Auth Store
export { useAuthStore } from '../features/auth/store/authStore';

// Postulations Store
export { usePostulationsStore } from './postulations/postulationsStore';

// Theme Store
export { useThemeStore } from './theme/themeStore';

// Language Store
export { useLanguageStore } from './language/languageStore';

// Exportar grupos con alias para mayor claridad en importaciones
import * as AuthStore from '../features/auth/store/authStore';
import * as PostulationsStore from './postulations/postulationsStore';
import * as LanguageStore from './language/languageStore';
import * as ThemeStore from './theme/themeStore';
// Exportar los grupos completos
export { AuthStore, PostulationsStore, LanguageStore, ThemeStore };

// You can also export types if needed here

// Re-export specific types and constants
export type { Postulation, PostulationState } from '../types/interface/postulations/postulation';
export type { AuthState } from '../features/auth/types/auth.interface';
export type { LanguageState } from '../types/interface/language/language.interface';
export type { ThemeState } from './theme/themeStore';
