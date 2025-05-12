import TitleCategorie from "../components/TitleCategorie"
import HeaderProducts from "../../products/components/HeaderProducts"
import { Outlet } from "react-router-dom"


const PageCategorie = () => {
    return (
        
            <>
                <HeaderProducts/>
                <TitleCategorie/>
                <div>
                    <Outlet/>
                </div>
            </>
        
    )
}

export default PageCategorie
