import SectionPrincipal from "../components/SectionPrincipal/SectionPrincipal";
import SectionCategorias from "../components/SectionCategorias/SectionCategorias";
import SectionAboutUsHome from "../components/SectionAboutUsHome/SectionAboutUsHome";
import SectionAboutUs from "../components/SectionAboutUs/SectionAboutUs";
import SectionServices from "../components/SectionServices/SectionServices";
import SectionBlog from "../components/SectionBlog/SectionBlog";

export const HomePage = () => {
   return (
      <>
         <SectionPrincipal/>
         <hr className="text-gray-50"/>
         <div className="max-full mx-auto">
            <SectionAboutUsHome/>
            <SectionAboutUs/>
            <SectionCategorias/>
            <SectionServices/> 
            <SectionBlog/>    
         </div>
      </>
   )
}

export default HomePage;