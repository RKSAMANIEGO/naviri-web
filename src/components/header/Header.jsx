import { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logo-navi.png';
import styles from "../../styles/header.module.css";

const productMenuItems = [
    { id: 'new', type: 'banner', title: 'Nuevos Productos', description: 'Descubre nuestras ultimas novedades en productos de belleza', to: '/products/new' },
    { id: 'all', title: 'Ver todo', description: 'Explora nuestra colección completa de productos', to: '/products' },
    { id: 'facial', title: 'Cuidado facial', description: 'Cremas, sérums, mascarillas y más para tu rutina facial.', to: '/products/facial-care' },
    { id: 'makeup', title: 'Maquillaje', description: 'Bases, labiales, sombras y todo para tu look perfecto', to: '/products/makeup' },
    { id: 'hair', title: 'Cuidado capilar', description: 'Champús, acondicionadores y tratamientos para tu cabello', to: '/products/hair-care' },
];

const categoryMenuItems = [
    { id: 'accessories', title: 'Accesorios', description: 'Encuentra productos esenciales para limpiar y proteger tu piel', to: '/categories/accessories' },
    { id: 'oils', title: 'Aceite', description: 'Aceites naturales para nutrir, revitalizar tu piel y cabello', to: '/categories/oils' },
    { id: 'cosmetics', title: 'Cosméticos', description: 'Brochas, esponjas, neceseres y más para tu rutina', to: '/categories/cosmetics' },
    { id: 'hair', title: 'Cuidado capilar', description: 'Tratamientos para fortalecer y embellecer tu cabello', to: '/categories/hair-care' },
    { id: 'body', title: 'Cuidado corporal', description: 'Perfumes y colonias para cada ocasión y estilo', to: '/categories/body-care' },
    { id: 'salts', title: 'Sales minerales', description: 'Sales de baño, ideales para revitalizar y suavizar la piel', to: '/categories/mineral-salts' },
];

const Header = () => {
    const [showProductos, setShowProductos] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const productosRef = useRef(null);
    const categoriasRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }
        return () => document.body.classList.remove(styles.noScroll);
    }, [isMobileMenuOpen]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (productosRef.current && !productosRef.current.contains(event.target)) {
                setShowProductos(false);
            }
            if (categoriasRef.current && !categoriasRef.current.contains(event.target)) {
                setShowCategorias(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleDropdownEnter = (setter) => {
        setter(true);
    };

    const handleDropdownLeave = (setter) => {
        setter(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <Link to="/" onClick={closeMobileMenu}>
                        <img src={logo} alt="Navi Cosméticos Logo" />
                    </Link>
                </div>

                <nav className={`${styles.nav} ${styles.desktopNav}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ''} end>Inicio</NavLink>
                    <div
                        ref={productosRef}
                        className={styles.dropdownTrigger}
                        onMouseEnter={() => handleDropdownEnter(setShowProductos)}
                        onMouseLeave={() => handleDropdownLeave(setShowProductos)}
                    >
                        <NavLink to="/products" className={({ isActive }) => isActive ? styles.activeLink : ''} aria-haspopup="true" aria-expanded={showProductos}>
                            Productos <FaChevronDown className={`${styles.iconDropdown} ${showProductos ? styles.iconDropdownOpen : ''}`} />
                        </NavLink>
                        <div className={`${styles.dropdown} ${showProductos ? styles.dropdownVisible : ''}`}>
                            {productMenuItems.map(item => (
                                item.type === 'banner' ? (
                                    <Link key={item.id} to={item.to} className={styles.productosnew} onClick={() => setShowProductos(false)}>
                                        <div className={styles.titleproductos}>
                                            <h1>{item.title}</h1>
                                            <p>{item.description}</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link key={item.id} to={item.to} className={styles.dropdownSection} onClick={() => setShowProductos(false)}>
                                        <h1>{item.title}</h1>
                                        <p>{item.description}</p>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                    <div
                        ref={categoriasRef}
                        className={styles.dropdownTrigger}
                        onMouseEnter={() => handleDropdownEnter(setShowCategorias)}
                        onMouseLeave={() => handleDropdownLeave(setShowCategorias)}
                    >
                        <NavLink to="/categories" className={({ isActive }) => isActive ? styles.activeLink : ''} aria-haspopup="true" aria-expanded={showCategorias}>
                            Categorías <FaChevronDown className={`${styles.iconDropdown} ${showCategorias ? styles.iconDropdownOpen : ''}`} />
                        </NavLink>
                        <div className={`${styles.dropdown} ${styles.categoryDropdown} ${showCategorias ? styles.dropdownVisible : ''}`}>
                            {categoryMenuItems.map(item => (
                                <Link key={item.id} to={item.to} className={styles.dropdownSection} onClick={() => setShowCategorias(false)}>
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : ''}>Nosotros</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : ''}>Contacto</NavLink>
                </nav>

                <div className={`${styles.sectionright} ${styles.desktopNav}`}>
                    <form className={styles.searchbar} onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/products?search=${searchTerm}`);
                    }}>
                        <input
                            type="text"
                            placeholder="Buscar productos"
                            aria-label="Buscar productos"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className={styles.searchButton} aria-label="Buscar">
                            <FaSearch className={styles.iconsearch} aria-hidden="true" />
                        </button>
                    </form>
                    <Link to="/cart" className={styles.cart} aria-label="Ver carrito de compras">
                        <FaShoppingCart className={styles.carticon} aria-hidden="true"/>
                        <span className={styles.cartcount}>0</span>
                    </Link>
                    <Link to="/reservar" className={styles.btnreserve}>Reservar</Link>
                </div>

                <button
                    className={styles.menuIcon}
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobileNavMenu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <nav
                id="mobileNavMenu"
                className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}
            >
                <form
                    className={`${styles.searchbar} ${styles.mobileSearch}`}
                    onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/products?search=${searchTerm}`);
                        closeMobileMenu();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Buscar productos"
                        aria-label="Buscar productos"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className={styles.searchButton} aria-label="Buscar">
                        <FaSearch className={styles.iconsearch} aria-hidden="true"/>
                    </button>
                </form>
                <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closeMobileMenu} end>Inicio</NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closeMobileMenu}>Productos</NavLink>
                <NavLink to="/categories" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closeMobileMenu}>Categorías</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closeMobileMenu}>Nosotros</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closeMobileMenu}>Contacto</NavLink>
                
                <div className={styles.mobileExtras}>
                    <Link to="/cart" className={styles.cart} onClick={closeMobileMenu} aria-label="Ver carrito de compras">
                        <span className={styles.mobileCartContent}>Carrito <FaShoppingCart className={styles.carticon} aria-hidden="true"/></span>
                        <span className={styles.cartcount}>0</span>
                    </Link>
                    <Link to="/reservar" className={`${styles.btnreserve} ${styles.mobileReserveBtn}`} onClick={closeMobileMenu}>
                        Reservar
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;