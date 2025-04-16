import api from "../../../core/api/apiClient"; // Adjusted path

// Servicio actualizado
export const getBlogs = async (page = 1, limit = 5, category = "") => {
	try {
		const response = await api.get("/blogs", {
			params: {
				page,
				limit,
				category,
			},
		});
		console.log(response);

		return response;
	} catch (error) {
		console.error("Error al obtener Blogs:", error);
		return null;
	}
};

export const getAllBlogs = async () => {
	try {
		const response = await api.get("/blogs");
		console.log(response);

		return response.data;
	} catch (error) {
		console.error("Error al obtener Blogs:", error);
		return null;
	}
};

export const getBlogById = async (id) => {
	try {
		const response = await api.get(`/blogs/${id}`);
		console.log(response);

		return response.data;
	} catch (error) {
		console.error("Error al obtener Blog:", error);
		return null;
	}
};