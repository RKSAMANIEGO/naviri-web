import api from "../api/api";

export const getPolicies = async (form) => {
    try {
      const response = await api.get("/policies", form);
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error de autenticación");
      } else {
        throw new Error("Error de conexión con el servidor");
      }
    }
  };