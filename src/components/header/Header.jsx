import {FaShoppingCart, FaSearch} from 'react-icons/fa';
import styles from "./header.module.css"

const Header = () => {
    return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <img src="/src/assets/image/logo-navi.png" alt="logo"/>
        </div>

        <nav className={styles.nav}>
            <a href="#">Inicio</a>
            <div className={styles.dropnow}>
                <a href="#">Productos</a>
            </div>

            <div className={styles.dropnow}>
                <a href="#">Categorías</a>
            </div>
            
            <a href="#">Nosotros</a>
            <a href="#">Contacto</a>
        </nav>

        <div className={styles.sectionright}>
            <div className={styles.searchbar}>
                <input type= "text" placeholder="Buscar productos"/>
                <FaSearch className={styles.iconsearch}/>
            </div>


            <div className={styles.cart}>
                <FaShoppingCart className={styles.carticon}/>
                <span className={styles.cartcount}>0</span>
            </div>

            <button className={styles.btnreserve}>Reservar</button>
        </div>

    </header>
 );
};

export default Header;