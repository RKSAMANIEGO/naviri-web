import TitleCategorie from "../../components/categoriaLanding/TitleCategorie"
import HeaderProducts from "../../components/Products/HeaderProducts"
import OptionsProducts from "../../components/Products/OptionsProducts"
import { Outlet } from "react-router-dom"


const PageCategorie = () => {
    return (
        
            <>
                <HeaderProducts/>
                <OptionsProducts/>
                <TitleCategorie/>
                <div>
                    <Outlet/>
                </div>
            </>
        
    )
}

export default PageCategorie
