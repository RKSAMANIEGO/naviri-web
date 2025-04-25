import TitleCategorie from "../components/TitleCategorie"
import HeaderProducts from "../../products/components/HeaderProducts"
import OptionsProducts from "../../products/components/OptionsProducts"
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
