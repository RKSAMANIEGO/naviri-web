import api from "../api/api";

export const getPolicies = async () => {
  try {
      const response = await api.get('/policies');
      console.log("Respuesta API:", response);
      return response.data;
  } catch (error) {
      console.error("Error al obtener zapatillas:", error);
      return [];
  }
};
