import { create } from 'zustand';
import { login, refreshToken } from '../../services/authservices';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = create((set, get) => ({
    isAuthenticate: false,
    loading: true,
    error: null,
    tokenRefreshTimeout: null,

    login: async (form) => {
        try {
            const response = await login(form);
            
            if (!response.data) {
                throw new Error('Error en las credenciales');
            }
            
            const { token } = response.data;
            localStorage.setItem('accessToken', token);
            
            const decodedToken = jwtDecode(token);
            set({ error: null, isAuthenticate: true });
            
            get().scheduleTokenRefresh(token);
            return true; 
        } catch (error) {
            let errorMessage = error.response?.data?.message || error.message;
            if (errorMessage === 'Unauthorized') {
                errorMessage = 'Usuario o contraseña incorrectos';
            }
            set({ error: errorMessage, isAuthenticate: false });
            return false; 
        } finally {
            set({ loading: false });
        }
    },

    refreshAccessToken: async () => {
        try {
            const currentToken = localStorage.getItem('accessToken');
            if (!currentToken) throw new Error('No hay token disponible');
            
            const { token } = await refreshToken();
            localStorage.setItem('accessToken', token);
            
            get().scheduleTokenRefresh(token);
        } catch (error) {
            console.error('Error renovando token:', error.response?.data?.message || error.message);
            get().logout();
        }
    },

    scheduleTokenRefresh: (accessToken) => {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToExpire = decodedToken.exp - currentTime;
        
        // Renovar 5 minuto antes de la expiración
        const buffer = 300; 
        const timeout = Math.max(timeToExpire - buffer, 0) * 1000;
        
        clearTimeout(get().tokenRefreshTimeout);
        
        const timeoutId = setTimeout(() => {
            get().refreshAccessToken();
        }, timeout);
        
        set({ tokenRefreshTimeout: timeoutId });
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        if (get().tokenRefreshTimeout) clearTimeout(get().tokenRefreshTimeout);
        set({ 
            tokenRefreshTimeout: null,
            isAuthenticate: false,
            loading: false,
            error: null
        });
    },

    initialize: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) return;

            const decodedToken = jwtDecode(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);
            
            if (currentTime >= decodedToken.exp) {
                await get().refreshAccessToken();
            } else {
                set({ isAuthenticate: true });
                get().scheduleTokenRefresh(accessToken);
            }
        } catch (error) {
            console.error('Error inicializando auth:', error);
            get().logout();
        } finally {
            set({ loading: false });
        }
    }
}));