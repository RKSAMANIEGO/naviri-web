import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../core/context/authProvider"; 
import "./../styles/loginpage.css";
import logoNavi from "./../assets/image/logo.jpg";
import { FaUser, FaLock } from "react-icons/fa";
import { message } from "antd";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false); // Nuevo estado para el error de login
  const { login, isAuthenticate } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticate) navigate("/admin/panel/products");
  }, [isAuthenticate, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await login(formData);
      if (resp){
        message.success("Inicio de sesión exitoso");
        navigate("/admin/panel/products");
      } else {
        setLoginError(true); // Mostrar error si las credenciales son incorrectas
      }
    } catch (error) {
      console.log(error);
      setLoginError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setLoginError(false); // Resetear el error al cambiar los inputs
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
            {loginError && <span className="error-text">Credenciales incorrectas</span>} {/* Mensaje de error */}
          </div>
          <button type="submit" className="ingresar-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;