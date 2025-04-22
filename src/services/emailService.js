import api from "../api/api";

export const getEmails = async() => {
    try {
        const response = await api.get("/customers");
        return response.data;
    } catch (error) {
        console.error("Error fetching emails:", error);
        throw error;
    }
}

export const createEmail = async(data) => {
    try {
        const response = await api.post("/customers", data);
        return response;
    } catch (error) {
        console.error("Error creating email:", error);
        throw error;
    }
}

export const updateEmail = async (emailId, data) => {
    try {
        const emailData = {
            email: data.email,
            active: data.active
        };
        const response = await api.put(`/customers/${emailId}`, emailData);
        return response;
    } catch (error) {
        console.error("Error al actualizar el email:", error);
        throw error;
    }
}

export const deleteEmail = async (emailId) => {
    try {
        const response = await api.delete(`/customers/${emailId}`);
        return response;
    } catch (error) {
        console.error("Error al eliminar el email:", error);
        throw error;
    }
}