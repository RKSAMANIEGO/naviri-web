import { useState } from "react";
import { Clock, ArrowRight } from 'lucide-react'
// BlogCard.jsx
const BlogCard = ({ blog }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                   transition-all duration-300 ease-out flex flex-col h-full
                   border border-gray-100 hover:border-gray-200">
      <div className="relative aspect-video overflow-hidden">
        <a href={`/blog/${blog.id}`} className="block h-full">
          <img
            src={blog.image.url}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 
                      group-hover:scale-105"
            loading="lazy"
          />
        </a>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block bg-[#E1CCF5]/30 text-[#B62A69] px-3 py-1.5 
                         rounded-full text-xs font-medium tracking-wide">
            {blog.category.name}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 
                      leading-snug hover:text-[#B62A69] transition-colors">
          <a href={`/blog/${blog.id}`}>{blog.title}</a>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed 
                     flex-grow">
          {blog.description}
        </p>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <a
            href={`/blog/${blog.id}`}
            className="flex items-center justify-between gap-2 w-full 
                     text-[#B62A69] hover:text-fuchsia-700 transition-colors"
          >
            <span className="font-medium text-sm">Leer artículo</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform 
                                 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogCard;