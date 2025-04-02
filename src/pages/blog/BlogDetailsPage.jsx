import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Heart } from 'lucide-react';

const BlogDetailsPage = () => {
  const { state } = useLocation();
  const blog = state?.blog; 

  if (!blog) {
    return <p>No se encontró el blog.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Hero Image Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img 
            src="https://api.navinatubelleza.com/storage/policies/d888a4d2-8a4b-4d1c-a795-1e9e31166860.jpeg"
            alt={blog.title}
            className="w-full h-full object-cover absolute inset-0 transform transition-transform duration-500 hover:scale-105"
          />
          {/* Overlay Buttons */}
          <div className="absolute top-6 left-6 right-6 flex justify-between">
            <button className="bg-white/70 backdrop-blur-sm p-3 rounded-full hover:bg-white/90 transition-all">
              <ArrowLeft className="text-neutral-800" />
            </button>
            <div className="flex space-x-4">
              <button className="bg-white/70 backdrop-blur-sm p-3 rounded-full hover:bg-white/90 transition-all">
                <Share2 className="text-neutral-800" />
              </button>
              <button className="bg-white/70 backdrop-blur-sm p-3 rounded-full hover:bg-white/90 transition-all">
                <Heart className="text-neutral-800" />
              </button>
            </div>
          </div>
        </div>
        {/* Blog Content */}
        <div className="p-8 space-y-6">
          {/* Category and Date */}
          <div className="flex justify-between items-center">
            <span className="bg-[#E1CCF5] bg-opacity-30 px-3 py-1 rounded-full text-sm text-[#8A4FFF]">
              {blog.category.name}
            </span>
            <div className="flex items-center space-x-2 text-neutral-500">
              <Clock className="w-5 h-5 text-[#F2B5D4]" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          {/* Title */}
          <h1 className="text-3xl font-bold text-neutral-800 leading-tight">
            {blog.title}
          </h1>
          {/* Blog Content */}
          <div className="prose prose-lg text-neutral-700 leading-relaxed">
            {blog.description}
          </div>
          {/* Author Section */}
          <div className="flex items-center space-x-4 pt-6 border-t border-neutral-200">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img 
                src="/api/placeholder/56/56" 
                alt="Author" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800">
                {blog.author || 'Nombre del Autor'}
              </h3>
              <p className="text-neutral-500 text-sm">
                Escritor del Blog
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
