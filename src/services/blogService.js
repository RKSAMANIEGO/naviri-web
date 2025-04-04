import api from "../api/api";

// Servicio actualizado
export const getBlogs = async (page = 1, limit = 5, category = "") => {
	try {
		const responseProducts = await api.get("/blogs", {
			params: {
				page,
				limit, // Cambiado a per_page para coincidir con convención común
				category,
			},
		});
		console.log(responseProducts.data.data);

		return responseProducts;
	} catch (error) {
		console.error("Error al obtener Blogs:", error);
		return null;
	}
};
