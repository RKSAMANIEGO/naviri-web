import ContentProducts from '../components/ContentProducts'
import HeaderProducts from "../components/HeaderProducts"
import OptionsProducts from "../components/OptionsProducts"
import TitleProducst from "../components/TitleProducst"

const ProductsPage = () => { // Renamed component to ProductsPage

    return (
        <>
            <HeaderProducts/>
            <OptionsProducts/>
            <TitleProducst/>
            <ContentProducts/>
        </>
    )
}

export default ProductsPage // Updated export name