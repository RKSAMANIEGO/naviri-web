
import { useCallback } from 'react';
import Swal from 'sweetalert2';

const useBlogActions = (deleteBlog) => {
  const handleView = useCallback((blog) => {
    Swal.fire({
      title: blog.titulo,
      html: `
        <img src="${blog.imagen}" alt="${blog.titulo}" style="max-width: 200px; margin-bottom: 1rem; border-radius: 4px;">
        <p><strong>Categoría:</strong> ${blog.categoria}</p>
        <p>${blog.descripcion}</p>
      `,
      confirmButtonColor: '#2196F3',
    });
  }, []);

  const handleEdit = useCallback((blog) => {
    Swal.fire({
      title: `Editar "${blog.titulo}"`,
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título" value="${blog.titulo}">
        <textarea id="swal-desc" class="swal2-textarea" placeholder="Descripción">${blog.descripcion}</textarea>
        <input id="swal-cat" class="swal2-input" placeholder="Categoría" value="${blog.categoria}">
        <input id="swal-img" class="swal2-input" placeholder="URL Imagen" value="${blog.imagen}">
      `,
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#f44336',
      preConfirm: () => {
        return {
          titulo: document.getElementById('swal-title').value,
          descripcion: document.getElementById('swal-desc').value,
          categoria: document.getElementById('swal-cat').value,
          imagen: document.getElementById('swal-img').value
        }
      }
    });
  }, []);

  const handleDelete = useCallback((blog) => {
    Swal.fire({
      title: '¿Eliminar entrada?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#2196F3',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(blog.id);
        Swal.fire('¡Eliminado!', '', 'success');
      }
    });
  }, [deleteBlog]);

  return { handleView, handleEdit, handleDelete };
};

export default useBlogActions;