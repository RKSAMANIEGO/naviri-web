import api from "../../../core/api/apiClient";

// GET - obtener misión, visión, yt info
export const getCompanyInfo = async () => {
  try {
    const response = await api.get("/about-us");
    const data = response.data;

    return {
      id: data.id,
      mission: data.mission,
      vision: data.vision,
      name_yt: data.name_yt,
      url_yt: data.url_yt,
    };
  } catch (error) {
    console.error("Error al obtener datos de About Us Home:", error);
    return {
      id: null,
      mission: '',
      vision: '',
      name_yt: '',
      url_yt: '',
    };
  }
};

// PUT - actualizar misión y visión (junto con name_yt y url_yt que requiere la API)
export const updateCompanyInfo = async ({ id, mission, vision, name_yt, url_yt }) => {
  console.log ({ id, mission, vision, name_yt, url_yt })
  try {
    const payload = {
      mission,
      vision,
      name_yt,
      url_yt
    };

    const response = await api.put(`/about-us/${id}`, payload);
    console.log("Respuesta de actualización:", response);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar misión y visión:", error);
    throw error;
  }
};