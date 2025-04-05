import api from "../api/api";

export const listProducts = async (page = 1, limit = 16) => {
	try {
		const response = await api.get("/products", {
			params: { page, limit },
		});
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
export const deleteProduct = (nameProduct) => {
	try {
		const response = api.delete(`/products/${nameProduct}`);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Eliminar" + error);
		return null;
	}
};
