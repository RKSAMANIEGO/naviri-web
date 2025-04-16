import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../../components/index.js'
import Formulario from '../../pages/SectionFormulario/Formulario'
import Testimonios from '../../pages/SectionTestimonios/TestimonioPrincipal'

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Outlet /> 
      </main>
      
      <Testimonios/>
      <Formulario />
      <Footer />
    </div>
  )
}

export default MainLayout