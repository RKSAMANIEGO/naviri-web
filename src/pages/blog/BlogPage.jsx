import React, { useEffect, useState } from 'react'
import { getBlogs } from '../../services/blogService'
import BlogCard from '../../components/blog/BlogCard'
import { useQuery } from '@tanstack/react-query'

const BlogPage = () => {
  const { data: blogs, error, isLoading } = useQuery({
    queryKey: ["blogs"], 
    queryFn: getBlogs,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FCEEF2] py-12 flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FCEEF2] py-12 flex items-center justify-center">
        <p>Error al cargar los blogs.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FCEEF2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#F2B5D4] mb-4">
            Nuestro Blog de Belleza Natural
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Descubre consejos, secretos y conocimientos sobre belleza natural y cuidado sostenible
          </p>

        </header>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.data && blogs.data.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* SI NO EXISTEN BLOGS */}
        {(!blogs.data || blogs.data.length === 0) && (
          <div className="text-center py-12">
            <p className="text-neutral-600">
              No se encontraron artículos relacionados
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage;
