import api from "../../../core/api/apiClient"; // Adjusted path

// Functions from categoriesService.js
export const getCategories = async () => {
	try {
		const response = await api.get("/categories");
		return response.data;
	} catch (error) {
		console.error("Ocurrio un Error al listar Categorias" + error);
		return null;
	}
};

export const addCategorie = async (form) => {
	try {
		const response = await api.post("/categories", form);
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

export const deleteCategorie = async (idCategorie) => {
	try {
		const response = await api.delete(`categories/${idCategorie}`);
		console.log(response);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Eliminar " + error.message);
		return null;
	}
};

export const putCategorie = async (idCategorie, form) => {
	try {
		const response = await api.put(`categories/${idCategorie}`, form);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Actualizar la Categoria " + error);
		return null;
	}
};

// Functions from subCategories.js
export const getSubCategorie = async (namCategorie) => {
	try {
		const response = await api.get(`/categories/${namCategorie}/subcategories`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error("Hubo un Error al Listar las SubCategories " + error);
		return null;
	}
};

export const postSubCategories = async (namCategorie, form) => {
	try {
		const response = await api.post(
			`/categories/${namCategorie}/subcategories`,
			form,
		);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Guardara la SubCategorie " + error);
		return null;
	}
};

export const deleteSubCategorie = async (nameSubCategorie) => {
	try {
		const response = await api.delete(`/subcategories/${nameSubCategorie}`);
		return response;
	} catch (error) {
		console.error("Ocurrio un error al Eliminar la SubCategoria " + error);
		return null;
	}
};