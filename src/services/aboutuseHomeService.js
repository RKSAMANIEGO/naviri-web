import api from "../api/api";

export const getAboutUsHome = async () => {
    try{
        const response = await api.get('/about-us-home');
        console.log("Datos del about us:", response.data)

        if (!response.data.images) {
            console.warn("No se ha recibido una imagen.");
        }

        return response.data

    } catch (error){
        console.error("Error al obtener los datos about us: ", error)
        return null
    }
}