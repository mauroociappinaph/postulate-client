import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { AuthState } from "../../types/interface/auth/authStore.interface";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { User } from "../../types/interface/auth/authStore.interface";
import { authApi } from "../../api";

const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  return (decoded.exp ?? 0) * 1000 < Date.now();
};
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { AuthState } from "../../interfaces";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { User } from "../../interfaces/auth/auth.interface";
import { authApi } from "../../api";

const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  return (decoded.exp ?? 0) * 1000 < Date.now();
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialize: () => {
        const { user } = get();
        if (user) {
          set({ loading: false });
        }
        console.log('Auth store inicializado', { user, loading: false });
      },
      signIn: async (email: string, password: string) => {
        set({ loading: true });

        try {
          const response = await authApi.login({ email, password });

          console.log('Respuesta del servidor:', response.status);
          if (!response.ok) {
            const error = await response.json();
            console.error('Error en login:', error);
            throw new Error(error.message || 'Credenciales inválidas');
          }

          const data = await response.json();
          console.log('Login exitoso:', data);
          set({ user: data.result, loading: false });
          console.log('Usuario seteado en el store:', get().user);

        } catch (error) {
          console.error('Error en login:', error);
          set({ loading: false });
          if (error.response?.status === 401) {
            throw new Error(
              error.response.data.message || "Credenciales incorrectas",
            );
          }
          throw new Error(
            error.response?.data?.message || "Error en la autenticación",
          );
        }
      },

      signUp: async (
        email: string,
        password: string,
        name: string,
        userName: string,
        lastName: string,
      ) => {
        set({ loading: true });

        try {
          const response = await authApi.register({
            email,
            name,
            userName,
            lastName,
            password,
          });

          const data = response.data;
          set({ user: data.result, loading: false });
        } catch (error) {
          set({ loading: false });
          if (error.response?.status === 409) {
            throw new Error(
              error.response.data.message || "El usuario ya existe",
            );
          }
          throw new Error(
            error.response?.data?.message || "Error en el registro",
          );
        }
      },

      signOut: () => {
        console.log("Cerrando sesión");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });
      },

      updateUser: (data: { name?: string; email?: string }) => {
        console.log("Actualizando usuario:", data);
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },

      initialize: () => {
        const { token } = get();
        if (token) {
          const decoded = jwtDecode<JwtPayload & User>(token);
          set({
            isAuthenticated: true,
            user: {
              id: decoded.id,
              name: decoded.name,
              lastName: decoded.lastName,
              userName: decoded.userName,
              email: decoded.email,
            },
            loading: false,
          });
        } else {
          set({ loading: false });
        }
        console.log("Auth store inicializado", { token, loading: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);

// Configurar el interceptor de axios para incluir el token en todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();
      authStore.signOut();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
