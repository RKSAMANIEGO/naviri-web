

export const login = async (form) => {
    try {
        const response = await api.get('/login',form);
        console.log("Respuesta API:", response);
              
        localStorage.setItem("tokenAccess", data.token);
        alert("Inicio de sesión exitoso.");      

        return response;
    } catch (error) {
        console.error("Error al obtener zapatillas:", error);
        return [];
    }
  };