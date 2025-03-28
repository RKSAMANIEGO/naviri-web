import {FaShoppingCart, FaSearch} from 'react-icons/fa';
import styles from "./header.module.css"
import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {FaShoppingCart, FaSearch, FaChevronDown } from 'react-icons/fa';
import styles from "../../styles/header.module.css";

const Header = () => {

    const [showProductos, setShowProductos] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);


    return (

    <header className={styles.header}>
        <div className={styles.logo}>
            <img src="/src/assets/image/logo-navi.png" alt="logo"/>
        </div>

        <nav className={styles.nav}>
            <Link to='/'>Inicio</Link>
            <Link to='/'>Inicio</Link>
            <div className={styles.dropnow}>
                <a href="#">Productos</a>
            </div>
            <a href="#">Inicio</a>

            <div className={styles.dropnow}
                onMouseEnter={() => setShowProductos(true)}
                onMouseLeave={() => setShowProductos(false)}
            >
                <a href="#">Productos <FaChevronDown className={styles.iconDropdown}/></a>
                {showProductos && (
                    <div className={styles.dropdown}>
                        <a href="#" className={styles.productosnew}>Nuevos Productos
                            <p>Descubre nuestras ultimas novedades en productos de belleza</p>
                        </a>
                        <a href="#">Ver Todo
                            <p>Explora nuestra colección completa de productos</p>
                        </a>
                        <a href="#">Ciudado facial
                            <p>Cremas, sérums, mascarillas y más para tu rutina facial.</p>
                        </a>
                        <a href="#">Maquillaje
                            <p>Bases, labiales, sombras y todo para tu look perfecto</p>
                        </a>
                        <a href="#">Ciudado capilar
                            <p>Champús, acondicionadores y tratamientos para tu cabello</p>
                        </a>
                    </div>
                )}
            </div>

            <div className={styles.dropnow}
                onMouseEnter={() => setShowCategorias(true)}
                onMouseLeave={() => setShowCategorias(false)}
            >
                <a href="#">Categorías <FaChevronDown className={styles.iconDropdown}/></a>
                {showCategorias && (
                    <div className={styles.dropdown}>
                        <a href="#">Accesorios</a>
                        <a href="#">Aceites</a>
                        <a href="#">Cosmeticos</a>
                        <a href="#">Ciudado capilar</a>
                        <a href="#">Ciudado corporal</a>
                        <a href="#">Sales Minerales</a>
                    </div>
                )}
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
 
}

export default Header;