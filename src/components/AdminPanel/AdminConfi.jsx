import React, { useState, useEffect } from 'react';
import './../../styles/adminconfi.css';
import { FaUser, FaCheckCircle } from 'react-icons/fa';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Obtener el token de localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Llamar a la API para obtener los datos del usuario
      fetch('https://api.navinatubelleza.com/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.email) {
            setEmail(data.email); // Establecer el correo en el estado
          }
        })
        .catch(err => {
          console.error('Error al obtener los datos del usuario:', err);
        });
    }
  }, []);

  const sendCodeToEmail = async () => {
    try {
      const response = await fetch('https://api.navinatubelleza.com/api/send-code-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        setCodeSent(true);
        setError('');
        setSuccess('Código enviado al correo.');
      } else {
        setError(data.message || 'Error al enviar el código.');
      }
    } catch (err) {
      setError('Error de red al enviar el código.');
    }
  };

  const verifyCode = async () => {
    if (code.trim().length === 6) {
      try {
        const response = await fetch('https://api.navinatubelleza.com/api/auth/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code })
        });

        const data = await response.json();

        if (response.ok) {
          setIsCodeVerified(true);
          setError('');
          setSuccess('Código verificado correctamente.');
        } else {
          setError(data.message || 'Código incorrecto.');
        }
      } catch (err) {
        setError('Error al verificar el código.');
      }
    } else {
      setError('Código inválido.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Debes ingresar y confirmar la nueva contraseña.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('https://api.navinatubelleza.com/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Contraseña cambiada con éxito.');
        setError('');
        setIsModalOpen(false);
      } else {
        setError(data.message || 'Error al cambiar la contraseña.');
      }
    } catch (err) {
      setError('Error de red al cambiar la contraseña.');
    }
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {!isModalOpen && (
        <div className="icon-container" onClick={() => setIsModalOpen(true)}>
          <FaUser className="user-icon" />
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Cambiar contraseña</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="inputGroup">
                <label>Correo electrónico:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>

              {!codeSent && (
                <div className="button-container">
                  <button type="button" className="button" onClick={sendCodeToEmail}>
                    Enviar código al correo
                  </button>
                </div>
              )}

              {codeSent && (
                <>
                  <div className="inputGroup">
                    <label>Código recibido:</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="input"
                      />
                      <FaCheckCircle
                        onClick={verifyCode}
                        style={{ cursor: 'pointer', color: 'green', fontSize: '1.5rem' }}
                        title="Verificar código"
                      />
                    </div>
                  </div>

                  {isCodeVerified && (
                    <>
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

                      <div className="button-container">
                        <button type="submit" className="button">
                          Guardar nueva contraseña
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
