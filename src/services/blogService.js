import api from '../api/api'


export const getBlogs = async () => {
    try {
        const response = await api.get('/blogs');
        console.log("Respuesta API:", response);
        return response.data;
    } catch (error) {
        console.error("Error al obtener Blogs:", error);
        return null;
    }
}