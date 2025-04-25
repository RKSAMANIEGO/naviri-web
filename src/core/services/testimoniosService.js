import api from '../api/apiClient'

export const getTestimonios = async() => {
  
    try {
        const response=await api.get('/testimonies');
        console.log(response)

        return response.data;
        
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.log("Error")
        return null
    }
  
}




export const createTestimonios = async(data) => {
    console.log(data)
    try {
        const response=await api.post('/testimonies', data);
        console.log(response)

        return response.data;
        
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.log("Error")
        return null
    }
  
}

export const getTestimoniosPage = async(page=1, limit=5) => {
  
    try {
        const response=await api.get('/testimonies', {
            params: {
                page: page,
                limit: limit
            }
        });
        console.log(response)

        return response;
        
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.log("Error")
        return null
    }
  
}

export const deleteTestimonio = async(id) => {
    
    try {
        const response=await api.delete(`/testimonies/${id}`);
        console.log(response)

        return response.data;
        
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.log("Error")
        return null
    }
  
}





export const updateTestimonio = async(id,data) => {
    console.log(data)
    try {
        const response=await api.put(`/testimonies/${id}`, data);
        console.log(response)

        return response.data;
        
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.log("Error")
        return null
    }
  
}