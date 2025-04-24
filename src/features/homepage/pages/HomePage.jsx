import SectionPrincipal from "../components/SectionPrincipal/SectionPrincipal";
import SectionCategorias from "../components/SectionCategorias/SectionCategorias";
import SectionServices from "../components/SectionServices/SectionServices";
import SectionBlog from "../components/SectionBlog/SectionBlog";

const HomePage = () => { 
   return (
      <>
         <SectionPrincipal/>
         <hr className="text-gray-50"/>
         <div className="max-full mx-auto">
            <SectionCategorias/>
            <SectionServices/>
            <SectionBlog/>
         </div>
      </>
   )
}

export default HomePage; // Keep default export