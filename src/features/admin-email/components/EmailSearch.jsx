import React, { useState, useEffect } from 'react';
import styles from '../styles/productAdmin.module.css';

const EmailSearch = ({ onSearch }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    onSearch(value.trim().toLowerCase());
  }, [value, onSearch]);

  return (
    <div className={styles.productSearch}>
      <h2>Gestión de Usuarios</h2>
      <p>Administra la información de los usuarios registrados. Puedes buscar, editar y cambiar la información.</p>
      <div>
        <label>
          <input
            className={styles.input}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Buscar por nombre, apellido, distrito o correo"
          />
          <i 
            className="fa-solid fa-magnifying-glass iconSearch"
          ></i>
        </label>
      </div>
    </div>
  );
};

export default EmailSearch;