import TitleCategorie from "../components/TitleCategorie"
import HeaderProducts from "../../products/components/HeaderProducts"
import { Outlet } from "react-router-dom"
import SeccionInAnimation from "../../../shared/animation/SeccionInAnimation"


const PageCategorie = () => {
    return (
        
            <>
                <HeaderProducts/>
                <SeccionInAnimation title={ <TitleCategorie/>} />
                <div>
                    <Outlet/>
                </div>
            </>
        
    )
}

export default PageCategorie
