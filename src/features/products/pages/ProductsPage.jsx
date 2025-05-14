import { Outlet, useLocation } from 'react-router-dom'
import ContentProducts from '../components/ContentProducts'
import HeaderProducts from "../components/HeaderProducts"
import TitleProducst from "../components/TitleProducst"

const ProductsPage = () => {
    const {pathname} = useLocation();
    return (
        <>  
        {pathname === "/products" ?
        <div>
            <HeaderProducts/>
            <TitleProducst />
            <ContentProducts/>
        </div>
        :
        <div>  
            <HeaderProducts/>
            <Outlet/>
        </div>
        }
        </>
    )
}

export default ProductsPage 