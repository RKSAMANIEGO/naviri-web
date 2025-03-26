import React, { useState } from "react";
import { login } from "../services/authService";

const LoginPage = () => {
    const [form, setForm] = useState({
        username: "",
        password: ""
        });

    const { username, password } = form;

    const onChangeText = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError(''); 
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        
        try {
          await login(form);
        } catch (error) {
          setError(error.message || "Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
          setIsSubmitting(false);
        }
      };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          name="username"
          onChange={onChangeText}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          name="password"
          onChange={onChangeText}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
