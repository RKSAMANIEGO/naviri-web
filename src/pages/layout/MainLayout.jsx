import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../../components/index.js'

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  )
}

export default MainLayout