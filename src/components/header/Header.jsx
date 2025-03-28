import { useState } from 'react';
import {FaShoppingCart, FaSearch, FaChevronDown } from 'react-icons/fa';
import styles from "../../styles/header.module.css";
import { Link } from 'react-router-dom';

const Header = () => {

    const [showProductos, setShowProductos] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);


    return (

    <header className={styles.header}>
        <div className={styles.logo}>
            <img src="/src/assets/image/logo-navi.png" alt="logo"/>
        </div>

        <nav className={styles.nav}>
            <Link to="/">Inicio</Link>

            <div
                className={styles.dropnow}
                onMouseEnter={() => setShowProductos(true)}
                onMouseLeave={() => setShowProductos(false)}
            >
                <a href="#">Productos <FaChevronDown className={styles.iconDropdown}/></a>
                {showProductos && (
                    <div className={styles.dropdown}>
                        <a href="#" className={styles.productosnew}>
                            <div className={styles.titleproductos}>
                              <h1>Nuevos Productos</h1>
                              <p>Descubre nuestras ultimas novedades en productos de belleza</p>
                            </div>
                        </a>

                        <div className={styles.sectiondrop1}>
                        <a href="#">
                            <h1>Ver todo</h1>
                            <p>Explora nuestra colección completa de productos</p>
                        </a>
                        </div>

                        <div className={styles.sectiondrop2}>
                        <a href="#">
                            <h1>Ciudado facial</h1>
                            <p>Cremas, sérums, mascarillas y más para tu rutina facial.</p>
                        </a>
                        </div>
                    
                        <div className={styles.sectiondrop3}>
                        <a href="#">
                            <h1>Maquillaje</h1>
                            <p>Bases, labiales, sombras y todo para tu look perfecto</p>
                        </a>
                        </div>

                        <div className={styles.sectiondrop4}>
                        <a href="#">
                            <h1>Ciudado capilar</h1>
                            <p>Champús, acondicionadores y tratamientos para tu cabello</p>
                        </a>
                        </div>
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

                       <div className={styles.sectiondrop1}>
                        <a href="#">
                            <h1>Accesorios</h1>
                            <p>Encuentra productos esenciales para limpiar y proteger tu piel</p>
                        </a>
                        </div>

                        <div className={styles.sectiondrop2}>
                        <a href="#">
                            <h1>Aceite</h1>
                            <p>Aceites naturales para nutrir, revitalizar tu piel y cabello</p>
                        </a>
                        </div>

                        <div className={styles.sectiondrop3}>
                        <a href="#">
                            <h1>Cosmeticos</h1>
                            <p>Brochas, esponjas, neceseres y más para tu rutina</p>
                        </a>
                        </div>

                        <div className={styles.sectiondrop4}>
                        <a href="#">
                            <h1>Ciudado capilar</h1>
                            <p>Tratamientos para fortalecer y embellecer tu cabello</p>
                        </a>
                        </div>

                        <div className={styles.sectiondrop5}>
                        <a href="#">
                            <h1>Ciudado corporal</h1>
                            <p>Perfumes y colonias para cada ocasión y estilo</p>
                        </a>
                        </div>

                        <div className={styles.sectiondrop6}>
                        <a href="#">
                            <h1>Sales minerales</h1>
                            <p>Sales de baño, ídeales para revitalizar y suavizar la piel</p>
                        </a>
                        </div>
    
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
};

export default Header;