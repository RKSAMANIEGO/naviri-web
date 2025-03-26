import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.navinatubelleza.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5uYXZpbmF0dWJlbGxlemEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MzAyNTkyMiwiZXhwIjoxNzQzMDI5NTIyLCJuYmYiOjE3NDMwMjU5MjIsImp0aSI6IlVNMDVYdXB2SGxjMlRWOGgiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.bffl8IO-5X6jVB8vIHTZbMgVQnFrMIlbX0W0PrqgYGo`;
  }
  return config;
});

export default api;