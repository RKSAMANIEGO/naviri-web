
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/blog/BlogCard";
import SectionPrincipal from "../../pages/sectionPrincipal/SectionPrincipal";
import SectionCategorias from "../sectionCategorias/sectionCategorias";
import SectionRecomendacion from "../../pages/sectionRecomendacion/sectionRecomendacion";
import Sectionaboutushome from "../sectionAboutUshome/Sectionaboutushome";
import Sectionaboutus from "../sectionAboutUs/sectionaboutus";
import Sectionservices from "../sectionServices/sectionservices";

export const Home = () => {


const blogsMock = [
   {
      id: 1,
      title: "¿Que beneficios tra el Aceite de Girasol?",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      category: {
         id: 1,
         name: "Naturales"
      }

   },
   {
      id: 2,
      title: "¿Que beneficios tra el Aceite de Girasol?",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      category: {
         id: 2,
         name: "Naturales"
      }

   },
   {
      id: 3,
      title: "¿ Que beneficios tra el Aceite de Girasol ?",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      category: {
         id: 3,
         name: "Naturales"
      }

   },
   {
      id: 3,
      title: "¿ Que beneficios tra el Aceite de Girasol ?",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      category: {
         id: 3,
         name: "Naturales"
      }

   },
]

   return (
   <>
      <SectionPrincipal/>
      <hr className=" text-gray-50"/>
      <div className="max-full mx-auto">
      <Sectionaboutushome/>
      <Sectionaboutus/>
      <SectionCategorias/>
      <Sectionservices/>
      <SectionRecomendacion/>   
      

         <div className="w-full text-end my-4">
            <a href="/blog"><button className=" p-2 rounded-full cursor-pointer">Explorar</button></a>
         </div>
            <div className="grid md:grid-cols-4 gap-8">
            {blogsMock.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
            ))}   
            </div>
         </div> 
         
         {/*
         <div id="testimonio">
            <Testimonios/>
         </div>
          */}
         

      </>
   )
}

export default Home;