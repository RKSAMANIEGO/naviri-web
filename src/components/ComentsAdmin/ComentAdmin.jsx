import React, { useState } from 'react';
import styles from '../../styles/productAdmin.module.css';

const ComentAdmin = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    onSearch(value.trim().toLowerCase());
  };

  return (
    <div className={styles.productSearch}>
      <h2>Gestión de Comentarios</h2>
      <p>Administra los comentarios de los clientes. Puedes buscar, editar o eliminar entradas.</p>
      <div>
        <label>
          <input
            className={styles.input}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar por Cliente..."
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

export default ComentAdmin;