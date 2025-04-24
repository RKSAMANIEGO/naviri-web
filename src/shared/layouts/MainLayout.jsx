import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Formulario from '../components/Formulario/Formulario'
import Testimonios from '../components/Testimonials/TestimonioPrincipal'
import GoogleMaps from '../components/GoogleMaps/pages/GoogleMaps'
const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Outlet /> 
      </main>
      
      <Testimonios/>
      <Formulario />
      <GoogleMaps/>
      <Footer />
    </div>
  )
}

export default MainLayout