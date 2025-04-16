import api from "../api/api";

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
