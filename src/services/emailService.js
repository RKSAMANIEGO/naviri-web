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
        const response = await api.post("/customers",data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching emails:", error);
        throw error;
    }
    
}