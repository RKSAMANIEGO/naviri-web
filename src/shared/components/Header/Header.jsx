import { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaChevronDown, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/image/logo-navi.png';
import { useCart } from '../../../features/cart/context/CartContext';
import imageProduct1 from "../../../assets/image/cosmetologia.png";
import imageProduct2 from "../../../assets/image/cosmetologia2.jpg";
import imageCategory1 from "../../../assets/image/categoria1.jpg";
import imageCategory2 from "../../../assets/image/categoria2.jpg";

const productMenuItems = [
  { id: 'new', title: 'Nuevos Productos', description: 'Descubre nuestras últimas novedades en productos de belleza', to: '/new-products' },
  { id: 'promotions', title: 'Promociones', description: 'Aprovecha las Promociones que tenemos para ti', to: '/promotions' },
];

/*
const categoryMenuItems = [
  { id: 'accessories', title: 'Accesorios', description: 'Encuentra productos esenciales para limpiar y proteger tu piel', to: '/categories/accesorios' },
  { id: 'oils', title: 'Aceite', description: 'Aceites naturales para nutrir, revitalizar tu piel y cabello', to: '/categories/aceites' },
  { id: 'cosmetics', title: 'Cosméticos', description: 'Brochas, esponjas, neceseres y más para tu rutina', to: '/categories/cosmeticos' },
  { id: 'hair', title: 'Cuidado capilar', description: 'Tratamientos para fortalecer y embellecer tu cabello', to: '/categories/cuidado capilar' },
  { id: 'body', title: 'Cuidado corporal', description: 'Perfumes y colonias para cada ocasión y estilo', to: '/categories/Exfoliante Corporal' },
  { id: 'salts', title: 'Sales minerales', description: 'Sales de baño, ideales para revitalizar y suavizar la piel', to: '/categories/sales minerales' },
];
*/

const categoryMenuItems = [
  { id: 'accessories', title: 'Accesorios',to: '/categories/accesorios' },
  { id: 'oils', title: 'Aceites',  to: '/categories/aceites' },
  { id: 'cosmetics', title: 'Cosméticos', to: '/categories/cosmeticos' },
  { id: 'hair', title: 'Cuidado capilar', to: '/categories/cuidado capilar' },
  { id: 'body', title: 'Cuidado corporal', to: '/categories/Exfoliante Corporal' },
  { id: 'salts', title: 'Sales minerales', to: '/categories/sales minerales' },

  { id: 'soaps', title: 'Jabones', to: '/categories/jabones' },
  { id: 'hydrolates', title: 'Hidrolatos', to: '/categories/hidrolatos' },
  { id: 'perfumes', title: 'Perfumes', to: '/categories/perfumes' },
  { id: 'combs', title: 'Peines', to: '/categories/peines' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleCart, getCartCount } = useCart();

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
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleReserveClick = () => {
    const message = "¡Hola! Me gustaría reservar una cita para conocer más sobre sus servicios y productos.";
    window.open(`https://wa.me/+51927987259?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCartClick = () => {
    if (location.pathname === '/') {
      localStorage.removeItem("nameCategorie");
      navigate('/products');

    } else if(location.pathname.includes("/products/" )){
            navigate('/products');
            toggleCart();
    } else if(location.pathname.includes("/promotions")){
            navigate('/products');
            toggleCart();
    }else {
      toggleCart();
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className="h-12 w-auto" src={logo} alt="Navi Cosméticos" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              Inicio
            </NavLink>

            <div className="relative group">
              <NavLink
                to="/products"
                className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                Productos <FaChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </NavLink>

              <div className="absolute top-full left-0 w-screen max-w-xl bg-white shadow-lg rounded-lg p-6 hidden group-hover:grid transition-all duration-300 origin-top">
                <div className="col-span-2 grid grid-cols-3 gap-6">
                  <div className="col-span-2 grid grid-cols-1">
                    {productMenuItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.to}
                        className="p-4 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <img src={imageProduct1} alt="Categoría" className="rounded-lg h-40 object-cover w-full" />
                    <img src={imageProduct2} alt="Categoría" className="rounded-lg h-40 object-cover w-full" />
                  </div>
                </div>
              </div>
            
             {/* Puente invisible */}
              <div className="absolute top-full -inset-x-20 h-4 bg-transparent pointer-events-none"></div>
          </div>

{/* Categorías Dropdown */}
<div className="relative group">
  <NavLink
    to="/categories"
    className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium ${
      isActive ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-700 hover:text-pink-600'
    }`}
  >
    Categorías <FaChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
  </NavLink>

  <div className="absolute top-full left-0 w-screen max-w-2xl bg-white shadow-lg rounded-lg p-6 hidden group-hover:grid transition-all duration-300 origin-top">
    <div className="col-span-2 grid grid-cols-3 gap-6">
      <div className="h-[100%] col-span-2 grid grid-cols-2  gap-4">
        {categoryMenuItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="flex justify-center items-center  rounded-lg hover:bg-pink-400 hover:text-white transition-colors"
          >
            <h4 className="font-medium">{item.title}</h4>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4">
        <img src={imageCategory1} alt="Categoría" className="rounded-lg h-48 object-cover w-full" />
        <img src={imageCategory2} alt="Categoría" className="rounded-lg h-48 object-cover w-full" />
      </div>
    </div>
  </div>
  
  {/* Puente invisible */}
  <div className="absolute top-full -inset-x-20 h-4 bg-transparent pointer-events-none"></div>
</div>

            {/* Otros enlaces */}
            <NavLink 
              to="/blog" 
              className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              Blogs
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              Sobre Nosotros
            </NavLink>
            
            <NavLink 
              to="/contacts" 
              className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              Contacto
            </NavLink>

          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <form className="hidden md:flex items-center" onSubmit={(e) => {
              e.preventDefault();
              navigate(`/products?search=${searchTerm}`);
            }}>
              <input
                type="text"
                placeholder="Buscar productos"
                className="px-4 py-2 ring-1 ring-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-pink-500 w-48 lg:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-r-full hover:bg-pink-600 
                transition-colors h-10 cursor-pointer"
              >
                <FaSearch className="h-5 w-5" />
              </button>
            </form>

            <button 
              onClick={handleCartClick}
              className="relative text-gray-700 hover:text-pink-600 cursor-pointer"
            >
              <FaShoppingCart className="h-6 w-6" />
              <span className="absolute -top-3 -right-2  bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex 
                items-center justify-center">
                {getCartCount()}
              </span>
            </button>

            <button 
                  onClick={handleReserveClick}
                  className="w-full flex items-center justify-center gap-2 bg-pink-400 text-white py-2 px-4 rounded-lg

                  hover:bg-pink-500 hover:scale-105 cursor-pointer transition-colors "

                >
                  Reservar
                </button>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 hover:text-pink-600"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-50 pt-16 overflow-y-auto">
            <div className="px-4 pt-2 pb-8 space-y-4">
              {/* Mobile Search */}
              <form className="flex" onSubmit={(e) => {
                e.preventDefault();
                navigate(`/products?search=${searchTerm}`);
                closeMobileMenu();
              }}>
                <input
                  type="text"
                  placeholder="Buscar productos"
                  className="flex-1 px-4 py-2 border rounded-l-full focus:ring-pink-500 focus:border-pink-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white px-4 py-2 rounded-r-lg"
                >
                  <FaSearch className="h-5 w-5" />
                </button>
              </form>

              {/* Mobile Navigation Links */}
              <NavLink 
                to="/" 
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${
                  isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Inicio
              </NavLink>
              
              <NavLink 
                to="/products" 
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${
                  isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Productos
              </NavLink>
              
              <NavLink 

                to="/categories/cuidado capilar" 
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${
                  isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Categorías
              </NavLink>
              
              <NavLink 
                to="/blog" 
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${
                  isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Blogs
              </NavLink>
              
              <NavLink 
                to="/about" 
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${
                  isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sobre Nosotros
              </NavLink>
              
              <NavLink 
                to="/contacts" 
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${
                  isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Contacto
              </NavLink>
              
              <NavLink 
                to="/promotions" 
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${
                  isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Promoción
              </NavLink>

              <div className="pt-4 border-t">
                <button 
                  onClick={handleReserveClick}
                  className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="h-5 w-5" /> Reservar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;