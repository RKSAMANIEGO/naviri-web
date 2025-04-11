import React, { useEffect, useState } from 'react'
import { getBlogs } from '../../services/blogService'
import BlogCard from '../../components/blog/BlogCard'

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
    <>
    <div className="w-full text-end py-8">
        <a href="/blog"><button className=" rounded-full cursor-pointer mr-10">Explorar</button></a>
    </div>
    <div className="grid md:grid-cols-4 gap-8 px-4"> 
        {blogs?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
        ))}   
    </div>
    </>
  )
}

export default SectionBlog