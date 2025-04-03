import { useState } from "react";
import { Clock, ArrowRight } from 'lucide-react'
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
      className="w-full max-w-[350px] bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all 
                 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
    >
      {/* Imagen con aspect ratio 16:9 */}
      <div className="cursor-pointer relative aspect-video overflow-hidden">
        <img 
          src={"https://api.navinatubelleza.com/storage/policies/d888a4d2-8a4b-4d1c-a795-1e9e31166860.jpeg"}
          alt={blog.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onClick={handleReadMore}
          loading="lazy"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Etiqueta */}
        <div className="mb-2">                  
          <span className="inline-block bg-[#E1CCF5] bg-opacity-30 px-3 py-1 rounded-full text-xs md:text-sm">
            {blog.category.name}
          </span>
        </div>

        {/* Título responsive */}
        <h2 className="text-lg md:text-xl font-bold text-neutral-800 mb-3 line-clamp-2 min-h-[3.5rem]">
          {blog.title}
        </h2>

        {/* Descripción ajustable */}
        <p className="text-neutral-600 mb-4 line-clamp-3 text-sm md:text-base flex-grow">
          {blog.description}
        </p>

        {/* Botón de Leer Más */}
        <button 
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[#F2B5D4] text-white py-2.5 
                     rounded-full hover:bg-fuchsia-500 transition-all focus:outline-none text-sm md:text-base"
          onClick={handleReadMore}
        >
          <span>Leer Más</span>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  )
}

export default BlogCard;