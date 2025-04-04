import api from "../api/api";

export const listProducts = async (page = 1, limit = 16) => {
	try {
		const response = await api.get("/products", {
			params: { page, limit },
		});
		return response;
	} catch (error) {
		console.error("Ocurrio un Error " + error);
		return null;
	}
};
