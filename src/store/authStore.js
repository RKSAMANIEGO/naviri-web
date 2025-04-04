import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticate: false,
  login: async (formData) => {
    console.log("Intentando iniciar sesión con:", formData);
    // Simulación de autenticación
    set({ isAuthenticate: true });
  },
}));
