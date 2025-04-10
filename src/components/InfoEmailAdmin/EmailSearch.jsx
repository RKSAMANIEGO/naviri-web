import React, { useState } from 'react';
import styles from '../../styles/productAdmin.module.css';

const EmailSearch = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    onSearch(value.trim().toLowerCase());
  };

  return (
    <div className={styles.productSearch}>
      <h2>Gestión de Correos Electrónicos</h2>
      <p>Administra los correos electrónicos registrados. Puedes buscar, editar y cambiar el estado de los correos.</p>
      <div>
        <label>
          <input
            className={styles.input}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar por correo..."
          />
          <i 
            className="fa-solid fa-magnifying-glass iconSearch"
            onClick={handleSearch}
          ></i>
        </label>
      </div>
    </div>
  );
};

export default EmailSearch;