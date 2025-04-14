import SectionPrincipal from "../../pages/sectionPrincipal/SectionPrincipal";
import SectionCategorias from "../sectionCategorias/sectionCategorias";
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
            <SectionBlog/>    
         </div> 

         
      </>
   )
}

export default Home;