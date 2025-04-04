import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../../components/index.js'
import Formulario from '../SectionFormulario/Formulario'
import Testimonios from '../SectionTestimonios/TestimonioPrincipal'

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