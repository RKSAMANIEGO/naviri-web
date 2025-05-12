import api from "../../../core/api/apiClient";

export const listProducts = async (page = 1, limit = 16) => {
	try {
		const response = await api.get("/products", {
			params: { page, limit },
		});
		console.log(response);
		
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

export const deleteProduct = async (nameProduct) => {
	try {
		const response = await api.delete(`/products/${nameProduct}`);
		return response;
	} catch (error) {
		console.error("Ocurrio un Error al Eliminar" + error);
		return null;
	}
};

export const addProduct = async (formData) => {
	try {
	  const response = await api.post("/products", formData);
	  return response;
	} catch (error) {
	  if (error.response) {
		console.error("422 Detalles de validación:", error.response.data);
		return {
		  success: false,
		  message: error.response.data.message || "Error desconocido",
		  errors: error.response.data.errors,    // <— propaga el objeto de errores
		  status: error.response.status,
		};
	  }
	  // resto del catch…
	}
};
  
export const updateProduct = async (nameProduct, formData) => {
	try {
		const response = await api.post(`/products/${nameProduct}`,
			formData,
			{
			  headers: { 'Content-Type': 'multipart/form-data' }
			}
		  );
	  return response;
	} catch (error) {
	  // Si no hay response, error.response será undefined
	  const respData = error.response?.data;
	  console.error("422 Detalles de validación:", respData);
  
	  if (error.response) {
		return {
		  status: error.response.status,
		  message: respData?.message || "Error desconocido",
		  errors: respData?.errors || {},
		};
	  } else if (error.request) {
		return {
		  status: 500,
		  message: "No se recibió respuesta del servidor. Verifica tu conexión.",
		  errors: {},
		};
	  } else {
		return { status: 500, message: error.message, errors: {} };
	  }
	}

  };

