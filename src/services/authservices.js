import api from "../api/api";

export const login = async (form) => {
    try {
        const response = await api.post('/login',form);
        console.log(form)
        console.log("Respuesta API:", response);
              
        localStorage.setItem("tokenAccess", response.data.token);
        alert("Inicio de sesión exitoso.");      

        return response;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
  };