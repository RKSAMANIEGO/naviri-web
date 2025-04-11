import SectionPrincipal from "../../pages/sectionPrincipal/SectionPrincipal";
import SectionCategorias from "../sectionCategorias/sectionCategorias";
import SectionRecomendacion from "../../pages/sectionRecomendacion/sectionRecomendacion";
import Sectionaboutushome from "../sectionAboutUshome/Sectionaboutushome";
import Sectionaboutus from "../sectionAboutUs/sectionaboutus";
import Sectionservices from "../sectionServices/sectionservices";
import SectionBlog from "../sectionBlog/SectionBlog";

export const Home = () => {

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
         <SectionBlog/>    
       </div> 
         
      </>
   )
}

export default Home;