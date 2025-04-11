import api from "../api/api";

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

export const createBlog = async (data) => {
	console.log(data);

	try {
		const response = await api.post("/blogs", data);
		console.log(response);

		return response;
	} catch (error) {
		console.error("Error al guardar Blogs:", error);
		return null;
	}
};

export const updateBlog = async (id, data) => {
	console.log(data);

	try {
		const response = await api.put(`/blogs/${id}`, data);
		console.log(response);

		return response;
	} catch (error) {
		console.error("Error al Actualizar Blogs:", error);
		return null;
	}
};

export const deleteBlog = async (id) => {
	try {
		const response = await api.delete(`/blogs/${id}`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
