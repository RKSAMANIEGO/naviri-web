import api from "../api/apiClient";

export const getContact = async () => {
  try {
      const response = await api.get('/info-contact');
      console.log("Respuesta API:", response);
      return response.data;
  } catch (error) {
      console.error("Error al obtener Policies:", error);
      return [];
  }
};

export const updateContact = async (id, data) => {
  try {
      const form = {
        location: data.location,
        cellphone: data.cellphone,
        email: data.email,
        attention_hours: data.attention_hours
      }

      const response = await api.put(`/info-contact/${id}`,form);
      console.log("Respuesta API:", response);
      return response.data;
  } catch (error) {
      console.error("Error al editar Policies:", error);
      return [];
  }
};