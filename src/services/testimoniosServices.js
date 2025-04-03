import api from '../api/api'

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




















