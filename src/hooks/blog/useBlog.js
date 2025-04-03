
import { useState } from 'react';

const useBlogs = () => {
  const [blogs, setBlogs] = useState([
    { 
      id: 1, 
      titulo: 'Introducción a React', 
      descripcion: 'Conceptos básicos de React...', 
      categoria: 'Tutoriales', 
      imagen: 'https://via.placeholder.com/150'
    },
    { 
      id: 2, 
      titulo: 'Mejores prácticas CSS', 
      descripcion: 'Guía de estilos modernos...', 
      categoria: 'Frontend', 
      imagen: 'https://via.placeholder.com/150'
    },
  ]);

  const deleteBlog = (blogId) => {
    setBlogs(prev => prev.filter(b => b.id !== blogId));
  };

  return { blogs, deleteBlog };
};

export default useBlogs;