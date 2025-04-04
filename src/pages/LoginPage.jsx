import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../context/authProvider"; 
import "./../styles/loginpage.css";
import logoNavi from "./../assets/image/logo.jpg";
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login, isAuthenticate } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticate) navigate("/admin/panel/products");
  }, [isAuthenticate, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Nombre de usuario es requerido";
    if (!formData.password) newErrors.password = "Contraseña es requerida";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/admin/panel/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-page">
      <div className="styled-container">
        <div className="login-image">
          <img src={logoNavi} alt="Login" />
        </div>
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 className="login-title">Inicio de sesión</h2>
          <p className="login-subtitle">Ingrese sus credenciales para acceder</p>
          <div className="input-group">
            <label>Usuario</label>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Ingrese su usuario"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "error" : ""}
              />
            </div>
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="ingresar-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
