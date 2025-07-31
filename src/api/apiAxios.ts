// Configuración base para las peticiones HTTP
const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';
const API_KEY = process.env.VITE_API_KEY || 'dummy_key';

export { API_URL, API_KEY };
