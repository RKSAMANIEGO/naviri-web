import apiClient from "../api/apiClient";

export const login = async (form) => {
	try {
		const response = await apiClient.post("/login", form);
		// console.log(form);
		// console.log("Respuesta API:", response);
		localStorage.setItem("accessToken", response.data.token);

		return response;
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
};

export const refreshToken = async () => {
	try {
		const response = await apiClient.post("/refresh-token");
		console.log("Respuesta API:", response);
		
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
};