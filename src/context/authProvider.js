import { create } from 'zustand';
import { login } from '../services/authservices';

export const useAuthStore = create((set, get) => ({

    isAuthenticate: false,
    loading: true,
    error: null,

    login: async (form) => {
        try {
            const response = await login(form);
            
            if (!response.data) {
                throw new Error('Error en las credenciales');
            }
            set({ error: null, isAuthenticate: true });
            return true; 
        } catch (error) {
            let errorMessage = error.response?.data?.message || error.message;
            if (errorMessage === 'Unauthorized') {
                errorMessage = 'Usuario o contraseña incorrectos';
            }
            set({ error: errorMessage , isAuthenticate: false});
            return false; 
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        set({ loading: false, error: null, isAuthenticate: false });
    },

    initialize: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                // Aquí podrías hacer una llamada a la API para validar el token, si quieres.
                set({ isAuthenticate: true });
            } else {
                set({ isAuthenticate: false });
            }
        } catch (error) {
            console.error('Error inicializando auth:', error);
            get().logout();
        } finally {
            set({ loading: false });
        }
    }
}));