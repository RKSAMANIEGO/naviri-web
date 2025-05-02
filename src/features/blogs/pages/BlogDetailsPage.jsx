import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Share2, Heart } from 'lucide-react';
import { getBlogById } from '../services/blogsApi.js'; // Updated path


const BlogDetailsPage = () => {

  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogData = await getBlogById(blogId);
        setBlog(blogData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [blogId]);

  if (loading) {
    return <div className="text-center p-8">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF] py-12 px-3 sm:px-4">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="space-y-8">
          {/* Sección horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-6 items-start">
            {/* Imagen */}
            <div className="relative rounded-xl overflow-hidden bg-gray-100 max-w-[600px]">
              <img 
                src={blog.image.url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="bg-white/80 backdrop-blur-sm p-1.5 rounded-md hover:bg-white transition-all">
                  <Share2 className="text-neutral-700 w-4 h-4" />
                </button>
                <button className="bg-white/80 backdrop-blur-sm p-1.5 rounded-md hover:bg-white transition-all">
                  <Heart className="text-neutral-700 w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="space-y-5">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#f282d0] px-2.5 py-0.5 rounded-full text-xs md:text-sm text-white font-bold">
                  {blog.category.name}
                </span>
                <div className="flex items-center gap-1 text-neutral-500 text-sm">
                  <Clock className="w-3.5 h-3.5 text-[#F2B5D4]" />
                  <span>{blog.date}</span>
                </div>
              </div>

              <article className="prose prose-base md:prose-lg max-w-none text-neutral-700">
                {blog.description}
              </article>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;