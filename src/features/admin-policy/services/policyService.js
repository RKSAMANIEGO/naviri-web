import api from "../../../core/api/apiClient";

export const getPolicies = async () => {
	try {
		const response = await api.get("/policies");
		console.log("Respuesta API:", response);
		return response.data;
	} catch (error) {
		console.error("Error al obtener Policies:", error);
		return [];
	}
};

export const updatePolicy = async (id, data) => {
	try {
		const form = {
			title: data.title,
			description: data.description,
			image: data.image,
		};

		const response = await api.put(`/policies/${id}`, form);
		console.log("Respuesta API:", response);
		return response.data;
	} catch (error) {
		console.error("Error al editar Policies:", error);
		return [];
	}
};
