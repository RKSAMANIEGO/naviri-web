import api from "../services/promotionService.js";


export const getPromotions = async () => {
    try {
        const { data } = await api.get("/promotions");
        return data;
    } catch (error) {
        console.error("Error fetching promotions:", error);
        return null ;
    }
}
    
export const updatePromotion = async (id, data) => {
    try {
        const response = await api.put(`/promotions/${id}`, data);
        console.log(response);
        
        return response.data;
    }   catch (error) {
        console.error("Error updating promotion:", error);
        throw error;
    }
    
}

export const createPromotion = async (data) => {
    try {
        const response = await api.post("/promotions", data);
        return response.data;
    }
    catch (error) {
        console.error("Error creating promotion:", error);
        throw error;
    }
}

export const deletePromotion = async (id) => {
    try {
        const response = await api.delete(`/promotions/${id}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting promotion:", error);
        throw error;
    }

}