import React, { useEffect, useState } from 'react'
import { getBlogs } from '../../services/blogService'
import BlogCard from '../../components/blog/BlogCard'
import { ArrowRight } from 'lucide-react'

const SectionBlog = () => {
   const [blogs, setBlogs] = useState()

    useEffect(() => {
        const fetchData = async() => {
            const { data } =  await getBlogs(1, 4, "");
            setBlogs(data.data);
        }
        fetchData();
    }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    <div className="flex justify-between items-center mb-8 md:mb-12 px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-[#B62A69]">
        Blogs
      </h2>
      <a
        href="/blog"
        className="inline-flex items-center gap-2 px-4 py-3 bg-fuchsia-500 text-white rounded-full 
                   hover:bg-fuchsia-700 transition-colors duration-200 shadow-sm
                   text-sm md:text-base font-medium"
      >
        Explorar Todas
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
      </a>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    gap-6 md:gap-8 px-4">
      {blogs?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  </section>
  )
}

export default SectionBlog