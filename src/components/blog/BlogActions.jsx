
import React from 'react';
import styles from './blogAdmin.module.css';

const BlogActions = ({ blog, onView, onEdit, onDelete }) => (
  <div className={styles.actionsContainer}>
    <button 
      className={styles.viewButton}
      onClick={() => onView(blog)}
      aria-label="Ver detalles"
    >
      <i className="fa-solid fa-eye" />
    </button>
    <button
      className={styles.editButton}
      onClick={() => onEdit(blog)}
      aria-label="Editar entrada"
    >
      <i className="fa-solid fa-pencil" />
    </button>
    <button
      className={styles.deleteButton}
      onClick={() => onDelete(blog)}
      aria-label="Eliminar entrada"
    >
      <i className="fa-solid fa-trash-can" />
    </button>
  </div>
);

export default BlogActions;