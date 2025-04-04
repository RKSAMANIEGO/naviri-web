import React, { useState } from 'react';
import './../../styles/adminconfi.css';
import { FaUser } from 'react-icons/fa';  

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (!username || !currentPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son requeridos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Aquí se agregarían las llamadas a la API para actualizar los datos
    setSuccess('Perfil actualizado con éxito.');
    setError('');
    setIsModalOpen(false); // Cerrar el modal al guardar los cambios
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) { // Verifica que el clic sea fuera del modal
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* Ícono que abre el modal */}
      <div className="icon-container" onClick={() => setIsModalOpen(true)}>
        <FaUser className="user-icon" />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> {/* Evita que el clic dentro del modal cierre el modal */}
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="inputGroup">
                <label>Nombre de usuario:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                />
              </div>

              <div className="inputGroup">
                <label>Contraseña actual:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input"
                />
              </div>

              <div className="inputGroup">
                <label>Nueva contraseña:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input"
                />
              </div>

              <div className="inputGroup">
                <label>Confirmar nueva contraseña:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input"
                />
              </div>

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              {/* Contenedor para el botón */}
              <div className="button-container">
                <button type="submit" className="button">Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
