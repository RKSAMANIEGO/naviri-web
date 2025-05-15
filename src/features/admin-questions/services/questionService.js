import api from "../../../core/api/apiClient";

export const listQuestions= async (page = 1, limit = 16) => {
	try {
		const response = await api.get("/questions", {
			params: { page, limit },
		});
		console.log(response);

		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Listar las Preguntas" + error);
		return null;
	}
};

export const questionById = async (id) => {
	try {
		const response = await api.get(`/questions/${id}`);
		return response;
	} catch (error) {
		console.error("Ocurrio un error al Buscar la Pregunta por Id" + error);
		return null;
	}
};

export const deleteQuestions = async (id) => {
	try {
		const response = await api.delete(`/questions/${id}`);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Eliminar la Pregunta" + error);
		return null;
	}
};

export const addQuestions = async (form) => {
	try {
		const response = await api.post("/questions", form);
		return response;
	} catch (error) {
		if (error.response) {
			const respData = error.response?.data;
			console.error("422 Detalles de validación:", respData);
			return {
				status: error.response.status,
				message: respData?.message || "Error desconocido",
				errors: respData?.errors || {},
			};
		} else if (error.request) {
			return {
				status: 500,
				message: "No se recibió respuesta del servidor. Verifica tu conexión.",
				errors: {},
			};
		} else {
			return { status: 500, message: error.message, errors: {} };
		}
	}
};

export const updateQuestions = async (id, form) => {
	try {
		const response = await api.put(`/questions/${id}`, form);
		return response;
	} catch (error) {
		// Si no hay response, error.response será undefined
		const respData = error.response?.data;
		console.error("422 Detalles de validación:", respData);

		if (error.response) {
			return {
				status: error.response.status,
				message: respData?.message || "Error desconocido",
				errors: respData?.errors || {},
			};
		} else if (error.request) {
			return {
				status: 500,
				message: "No se recibió respuesta del servidor. Verifica tu conexión.",
				errors: {},
			};
		} else {
			return { status: 500, message: error.message, errors: {} };
		}
	}
};
