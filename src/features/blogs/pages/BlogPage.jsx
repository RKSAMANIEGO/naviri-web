import React, { useState } from 'react'
import aceite from '../../../assets/image/aceiteARBOLDETE.jpeg'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../services/blogsApi.js' // Updated path
import { 
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
//import { useNavigate } from 'react-router-dom'

const BlogPage = () => {
 // const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')

  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['blogs', currentPage, selectedCategory],
    queryFn: () => getBlogs(currentPage, 5, selectedCategory),
  })

  // Manejo de la respuesta de la API
  const blogs = apiResponse?.data?.data || []
  console.log(blogs);
  const pagination = {
    currentPage: apiResponse?.data?.current_page || 1,
    lastPage: apiResponse?.data?.last_page || 1,
    total: apiResponse?.data?.total || 0
  }

  // Extraer categorías únicas del primer conjunto de resultados
  const categories = [...new Set(blogs.map(blog => blog.category?.name))].filter(Boolean)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      setCurrentPage(newPage)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Resetear a primera página al cambiar categoría
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf5f7] flex items-center justify-center">
        <p className="text-lg text-gray-600">Cargando artículos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf5f7] flex items-center justify-center">
        <p className="text-lg text-red-500">Error al cargar los artículos</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf5f7]">
      {/* Hero Section */}
      <div className="relative h-64 md:h-72 bg-gradient-to-r from-[#F2B5D4] to-[#E1CCF5]">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Explorando la Belleza Natural
            </h1>
            <p className="text-base md:text-lg text-white/90">
              Descubre nuestros artículos especializados
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Filtros de Categoría */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedCategory === ''
                ? 'bg-[#F2B5D4] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas ({pagination.total})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-[#F2B5D4] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Listado de Artículos */}
        {blogs.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-600 text-base md:text-lg">No se encontraron artículos</p>
          </div>
        ) : (
          <div className="space-y-12">
            {blogs.map(blog => (
              <article 
                key={blog.id}
                className="border-b border-gray-200 pb-12 last:border-b-0"
              >
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Imagen del artículo */}
                  
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                    {blog.image=== null ?
                    <img
                    src={aceite} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    alt={blog.title}
                    /> 
                    :                   
                    <img
                      src={blog?.image.url} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      alt={blog.title}
                    />  
                    }

                  </div>

                  {/* Contenido del artículo */}
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-[#E1CCF5] text-[#6E45A2] px-2.5 py-1 rounded-full text-xs">
                        {blog.category?.name || 'General'}
                      </span>
                      <span className="flex items-center text-gray-500 text-xs">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        Última actualización
                      </span>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 leading-snug">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-600 line-clamp-3 text-sm md:text-base mb-4">
                      {blog.description}
                    </p>
                    
                    <a 
                      href={`/blog/${blog.id}`}
                      className="inline-flex items-center text-[#F2B5D4] font-medium text-sm md:text-base hover:text-[#d895b3] transition-colors group"
                    >
                      Leer artículo completo
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Paginación */}
        {pagination.lastPage > 1 && (
          <div className="mt-12 flex justify-center items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors text-sm ${
                  page === pagination.currentPage
                    ? 'bg-[#F2B5D4] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.lastPage}
              className="p-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage