import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import Formulario from '../SectionFormulario/Formulario';
import Testimonios from '../SectionTestimonios/TestimonioPrincipal';
import RecommendedSection from '../../components/cards/RecommendedSection';
export const Home = () => {
    
 return (
    <>
    <Header/>  

    <div id="recomendados">
         <RecommendedSection/>
      </div>
      <div id="testimonio">
         <Testimonios/>
      </div>

      
    
      <div id="formulario">
         <Formulario/>
      </div>

      


    <Footer/>
    </>
 )
}

export default Home;