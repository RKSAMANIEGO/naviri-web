import React, { useEffect, useState, useRef } from 'react'
import { getBlogs } from '../../../blogs/services/blogsApi.js' // Updated path
import BlogCard from '../../../blogs/components/BlogCard'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from 'scrollreveal';

const SectionBlog = () => {
   const [blogs, setBlogs] = useState()
   const sectionRef = useRef(null);
   const titleRef = useRef(null);
   const blogsContainerRef = useRef(null);
   const sr = useRef(null);

    useEffect(() => {
          sr.current = ScrollReveal({
            reset: false,
            distance: '40px',
            duration: 800,
            easing: 'ease-out',
            viewFactor: 0.2,
            opacity: 0,
            scale: 0.98
        })

        const fetchData = async() => {
            try {
                const { data } = await getBlogs(1, 4, "")
                setBlogs(data.data)
                setTimeout(() => {
                    if (titleRef.current) {
                        sr.current.reveal(titleRef.current, {
                            origin: 'left',
                            delay: 200,
                            beforeReveal: (el) => {
                                el.style.opacity = 1
                                el.style.transform = 'none'
                            }
                        })
                    }

                    if (blogsContainerRef.current) {
                        const cards = blogsContainerRef.current.children
                        Array.from(cards).forEach((card, index) => {
                            card.style.opacity = '0'
                            card.style.transform = 'translateY(20px)'
                            card.style.transition = 'all 0.6s ease-out'
                            
                            sr.current.reveal(card, {
                                origin: 'bottom',
                                delay: 400 + (index * 100),
                                beforeReveal: (el) => {
                                    el.style.opacity = '1'
                                    el.style.transform = 'translateY(0)'
                                }
                            })
                        })
                    }
                }, 100)
            } catch (error) {
                console.error("Error fetching blogs:", error)
            }
        }
        fetchData()

        return () => {
            if (sr.current) {
                sr.current.destroy()
            }
        }
    }, [])

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div ref={titleRef} className="flex justify-between items-center mb-8 md:mb-12 px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-[#f180a9]">
          Blogs
        </h2>
        <a
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-3 bg-[#f180a9] text-white rounded-full 
                   hover:bg-[#ff7ead] transition-colors duration-200 shadow-sm
                   text-sm md:text-base font-medium"
        >
          Explorar Todas
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </a>
      </div>
      
      <div ref={blogsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                      gap-6 md:gap-8 px-4">
        {blogs?.map((blog) => (
          <div key={blog.id} className="blog-card"> 
                        <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectionBlog