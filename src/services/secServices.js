import api from "../api/api";


export const getServices = async () => {
    try{
        const response = await api.get('/services');
        console.log("Datos de los servicios:", response.data);
        return response.data;

    } catch (error){
        console.error("Error al obtener los servicios: ", error)
        return null
    }
};


export const getServicesPage = async (page = 1, pageSize = 5) => {
    try {
      const response = await api.get('/services', {
        params: { 
          page, 
          limit: pageSize 
        }
      });
      
      console.log("Respuesta completa:", response);
      return {
        data: response.data.data || response.data,
        total: response.data.total || response.data.length || 0,
        page: Number(page),
        pageSize: Number(pageSize)
      };
      
    } catch (error) {
      console.error("Error en getServicesPage:", error);
      throw error;
    }
  };


export const createService = async (serviceData) => {
    try {
        const formData = new FormData();

        formData.append('title', serviceData.title);
        formData.append('description', serviceData.description);
        formData.append('features', JSON.stringify(serviceData.features));
        
        serviceData.images.forEach((image) => {
            if (image.originFileObj) {
              formData.append('images', image.originFileObj);
            }
          });
        
          const response = await api.post('/services', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          return response.data;
    } catch (error) {
        console.error("Error al crear el servicio: ", error);
        throw error;
    }
};

export const updateService = async (id, serviceData) => {
    try {
        const formData = new FormData();
        
        formData.append('title', serviceData.title);
        formData.append('description', serviceData.description);
        formData.append('features', JSON.stringify(serviceData.features));

        if (serviceData.newImages) {
            serviceData.newImages.forEach((image) => {
                if (image.originFileObj) {
                    formData.append('images', image.originFileObj);
                }
            });
        }
        
        if (serviceData.deletedImages) {
            formData.append('deletedImages', JSON.stringify(serviceData.deletedImages));
        }

        const response = await api.put(`/services/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el servicio: ", error);
        throw error;
    }
};


export const deleteService = async (id) => {
    try {
        const response = await api.delete(`/services/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el servicio: ", error);
        throw error;
    }
};