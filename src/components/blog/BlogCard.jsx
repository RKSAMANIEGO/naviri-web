import { useState } from "react";
import { 
    Clock, 
    ArrowRight 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${blog.id}`, { 
      state: { blog }
    });
  }

  return (
    <div 
      key={blog.id} 
      className=" w-[300px] bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Imagen */}
      <div className="cursor-pointer relative h-48 overflow-hidden">
        <img 
          src={"https://api.navinatubelleza.com/storage/policies/d888a4d2-8a4b-4d1c-a795-1e9e31166860.jpeg"}
          alt={blog.title} 
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
          onClick={handleReadMore}
        />
      </div>

      {/* Contentenido */}
      <div className="p-4">
        {/* etiqueta */}
        <div className="flex items-center mb-1 space-x-2">                  
          <span 
            className="bg-[#E1CCF5] bg-opacity-30  px-2 py-1 rounded-full text-xs"
          >
            {blog.category.name}
          </span>
        </div>

        {/* titulo */}
        <h2 className="text-lg font-bold text-neutral-800 mb-3">
          {blog.title}
        </h2>

        {/* Descripcion */}
        <p className="text-neutral-600 mb-4 line-clamp-5 text-sm">
          {blog.description}
        </p>

        {/* Actualizado */}
        {/* <div className="flex justify-between items-center text-sm text-neutral-500">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#F2B5D4]" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div> */}

        {/* boton de Leer Mas */}
        <button className="mt-4 cursor-pointer w-full flex items-center justify-center space-x-2 bg-[#F2B5D4] text-white py-2 rounded-full hover:bg-fuchsia-500 transition-all focus:outline-none"
          onClick={handleReadMore}
        >
          <span>Leer Más</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default BlogCard;