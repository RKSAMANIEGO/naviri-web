import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography, styled } from "@mui/material";
import { useAuthStore } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
const StyledContainer = styled(Box)({
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
});

const LoginCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  textAlign: "center",
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
  position: "relative",
  zIndex: 2,
});

const IngresarButton = styled(Button)({
  backgroundColor: "#FF69B4",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#FF1493",
  },
  fontWeight: "bold",
  padding: "10px 0",
  borderRadius: "8px",
});

const OpenModalButton = styled(Button)({
  backgroundColor: "#aea3ff",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#aea3ff",
  },
  fontWeight: "bold",
  padding: "10px 15px",
  borderRadius: "8px",
  position: "absolute",
  top: "20px",
  right: "20px",
});

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login, isAuthenticate} = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
    <StyledContainer>
      <OpenModalButton onClick={() => setOpen(true)}>Abrir Login</OpenModalButton>
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(253, 209, 220, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
          onClick={() => setOpen(false)}
        >
          <LoginCard component="form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <Typography variant="body2">Inicio &gt; Login</Typography>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ color: "#FF69B4", fontFamily: "Ribeye, cursive" }}
            >
              Bienvenido
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Nombre de Usuario *"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                required
                sx={{ input: { color: "#000" } }}
              />
              <TextField
                fullWidth
                label="Contraseña *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
                sx={{ input: { color: "#000" } }}
              />
              <IngresarButton type="submit">Ingresar</IngresarButton>
            </Stack>
          </LoginCard>
        </Box>
      )}
    </StyledContainer>
  );
};

export default LoginPage;