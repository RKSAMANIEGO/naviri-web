import api from "../../../core/api/apiClient"; // Updated path

export const listProducts = async (page = 1, limit = 16) => {
	try {
		const response = await api.get("/products", {
			params: { page, limit },
		});
		// // // console.log(response);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Listar el Producto" + error);
		return null;
	}
};

export const productByName = async (nameProduct) => {
	try {
		const response = await api.get(`/products/${nameProduct}`);
		return response;
	} catch (error) {
		console.error("Ocurrio un error al Buscar el Producto" + error);
		return null;
	}
};
export const deleteProduct = async (nameProduct) => {
	try {
		const response = await api.delete(`/products/${nameProduct}`);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Eliminar" + error);
		return null;
	}
};

export const addProduct = async (form) => {
	// // console.log(form);
	try {
		const response = await api.post("/products", form);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Registrar el Producto" + error);

		if (error.response) {
			return {
				success: false,
				message: error.response.data.message || "Error desconocido",
				status: error.response.status,
			};
		} else if (error.request) {
			return {
				success: false,
				message: "No se recibió respuesta del servidor. Verifica tu conexión.",
				status: 500,
			};
		} else {
			return { success: false, message: error.message, status: 500 };
		}
	}
};

export const updateProduct = async (nameProduct, form) => {
	// // // console.log(form);
	try {
		const response = await api.put(`/products/${nameProduct}`, form);
		// // // console.log(response);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Actualizar el Producto" + error);
		if (error.response) {
			return {
				success: false,
				message: error.response.data.message || "Error desconocido",
				status: error.response.status,
			};
		} else if (error.request) {
			return {
				success: false,
				message: "No se recibió respuesta del servidor. Verifica tu conexión.",
				status: 500,
			};
		} else {
			return { success: false, message: error.message, status: 500 };
		}
	}
};
