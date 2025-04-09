import api from "../api/api";

export const getServices = async () => {
    try{
        const response = await api.get('/services');
        console.log("Datos de los servicios:", response.data)

        if (!response.data.images) {
            console.warn("No se ha recibido una imagen.");
        }

        return response.data

    } catch (error){
        console.error("Error al obtener los datos about us: ", error)
        return null
    }
}