import styles from "./home.module.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import SectionPrincipal from "../../pages/sectionPrincipal/SectionPrincipal";

export const Home = () => {
    
 return (
    <>
    <Header/>  

    <div id="principal">
      <SectionPrincipal/>
    </div>

   
    <Footer/>
    </>
 )
}

export default Home;