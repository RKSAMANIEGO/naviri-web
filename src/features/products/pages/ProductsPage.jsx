import { Outlet, useLocation } from 'react-router-dom'
import ContentProducts from '../components/ContentProducts'
import HeaderProducts from "../components/HeaderProducts"
import OptionsProducts from "../components/OptionsProducts"
import TitleProducst from "../components/TitleProducst"
import SeccionInAnimation from '../../../shared/animation/SeccionInAnimation'

const ProductsPage = () => {
    const {pathname} = useLocation();
    return (
        <>  
        {pathname === "/products" ?
        <div>
            <HeaderProducts/>
            <SeccionInAnimation title={<TitleProducst />} />
            <ContentProducts/>
        </div>
        :
        <div>  
            <HeaderProducts/>
            <OptionsProducts/>
            <Outlet/>
        </div>
        }
        </>
    )
}

export default ProductsPage 