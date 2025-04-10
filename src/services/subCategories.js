import api from "../api/api";

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
