import api from "../../../core/api/apiClient";

export const getServices = async (page = 1, limit = 5) => {
	try {
		const response = await api.get("/services", {
			params: { page, limit },
		});
		console.log(response);
		return response.data;
	} catch (error) {
		console.error("Error al obtener Servicios:", error);
		return null;
	}
};

export const createService = async (data) => {
	console.log(data);
	try {
		const response = await api.post("/services", data);
		console.log(response);
		return response;
	} catch (error) {
		console.error("Error al crear Servicio:", error);
		return null;
	}
};

export const updateService = async (id, data) => {
	console.log(data);
	try {
		const response = await api.put(`/services/${id}`, data);
		console.log(response);
		return response;
	} catch (error) {
		console.error("Error al actualizar Servicio:", error);
		return null;
	}
};

export const deleteService = async (id) => {
	try {
		const response = await api.delete(`/services/${id}`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
