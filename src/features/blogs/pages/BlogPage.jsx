
import aceite from '../../../assets/image/aceiteARBOLDETE.jpeg'
import { useQuery } from '@tanstack/react-query'
import image from '../../../assets/image/imgHeader2.jpg'
import { getBlogs } from '../services/blogsApi.js' // Updated path
import styles from '../styles/blog.module.css'
import ScrollReveal from "scrollreveal";
import { 
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import SeccionScrollAnimation from '../../../shared/animation/SeccionScrollAnimation.jsx'
import { useEffect, useRef, useState } from 'react'
//import { useNavigate } from 'react-router-dom'

const BlogPage = () => {
 // const navigate = useNavigate()

  //Animación
  const sr = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')

  
  //animation
  useEffect(() => {
        sr.current = ScrollReveal({
            reset: false, 
            distance: '20px',
            duration: 1000,
            easing: 'cubic-bezier(0.5, 0, 0, 0.3)',
            viewFactor: 0.1, 
        });

        if (titleRef.current) {
            sr.current.reveal(titleRef.current, {
                origin: 'top',
                delay: 300,
            });
        }
        
        if (subTitleRef.current) {
            sr.current.reveal(subTitleRef.current, {
                origin: 'right',
                delay: 300,
            });
        }


        return () =>{
            if(sr.current){
                sr.current.clean(titleRef.current);
                sr.current.clean(subTitleRef.current);
            } 
        }

    }, []);



  //responsive con window width
  const [windowWidth,setWindowWidth]= useState(window.innerWidth);

  useEffect(()=>{
    const getWidthPage=()=>(setWindowWidth(window.innerWidth));

    window.addEventListener("resize", getWidthPage);

    return () => window.removeEventListener("resize",getWidthPage);
  },[])


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
      {/*<div className="relative h-64 md:h-72 bg-gradient-to-r from-[#F2B5D4] to-[#E1CCF5]">*/}
      
      <div className="relative h-[240px] md:h-72 " style={ {background:`url(${image})`, backgroundSize: windowWidth < 1025 ? "300%" : "cover", backgroundPosition:"top" } }>
        <div className="absolute inset-0  flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h1 ref={titleRef} className={`text-5xl md:text-7xl font-bold text-white mb-4 leading-tight ${styles.family}`}>
            Descubre tu belleza natural
            </h1>
            <p ref={subTitleRef} className="text-[12px] font-bold md:text-[14px] text-white">
              Descubre nuestros artículos especializados
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Filtros de Categoría */}
        <SeccionScrollAnimation direction="left">
        <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedCategory === ''
                ? 'bg-[#FF6BBC] text-white'
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
        </SeccionScrollAnimation>

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
                <SeccionScrollAnimation direction="rigth">
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
                      <span className="bg-[#fc87a6] text-[rgb(244,244,244)] px-2.5 py-2 rounded-full text-xs font-bold">
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
                      className="inline-flex items-center text-[#e974af] font-medium text-sm md:text-base hover:text-pink-500 transition-colors group"
                    >
                      Leer artículo completo
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
                </SeccionScrollAnimation>
              </article>
            ))}
          </div>
        )}

        {/* Paginación */}

        <SeccionScrollAnimation direction="left">
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
                    ? 'bg-[#dd2b84] text-white'
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
        </SeccionScrollAnimation>
      </div>
    </div>
  );
}

export default BlogPage