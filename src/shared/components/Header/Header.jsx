import { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaChevronDown, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/image/logo-navi.png';
import { useCart } from '../../../features/cart/context/CartContext';
import imageCategory1 from "../../../assets/image/categoria1.jpg";
import imageCategory2 from "../../../assets/image/categoria2.jpg";
import { getCategories } from '../../../features/admin-categories/services/adminCategoriesApi';

const categoryMenuItems = [
  { id: 'accessories', title: 'Accesorios', to: '/categories/accesorios' },
  { id: 'oils', title: 'Aceites', to: '/categories/aceites' },
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
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();

        if (response && response.data) {
          setCategories(response.data);
          console.log("Categories set:", response.data);
        } else {
          console.log("No categories data returned from API");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
    }
    else if (location.pathname.includes("/products/")) {
      navigate('/products');
      toggleCart();
    } else if (location.pathname.includes("/promotions")) {
      navigate('/products');
      toggleCart();
    } else {
      toggleCart();
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto  px-8 sm:px-4 lg:px-0">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img className="h-12 w-auto" src={logo} alt="Navi Cosméticos" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                  }`}
              >
                Inicio
              </NavLink>

              <NavLink
                to="/new-products"
                className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                  }`}
              >
                Lo Nuevo
              </NavLink>

              <NavLink
                to="/promotions"
                className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                  }`}
              >
                Ofertas
              </NavLink>

              <div className="relative group">
                <NavLink
                  to="/products"
                  className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                    }`}
                >
                  Productos
                </NavLink>

                {/* Puente invisible */}
                <div className="absolute top-full -inset-x-20 h-4 bg-transparent pointer-events-none"></div>
              </div>

              {/* Categorías Dropdown */}
              <div className="relative group h-full flex items-center">
                <NavLink
                  to="/categories"
                  className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                    }`}
                >
                  Categorías <FaChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </NavLink>

                <div className="absolute top-full left-0 w-screen max-w-2xl bg-white shadow-lg rounded-lg p-6 hidden group-hover:grid transition-all duration-300 origin-top">
                  <div className="col-span-2 grid grid-cols-3 gap-6">
                    <div className="h-[100%] col-span-2 grid grid-cols-2 gap-4">
                      {isLoading ? (
                        <div className="col-span-2 text-center py-4">Cargando categorías...</div>
                      ) : categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <Link
                            key={category.id || category._id}
                            to={`/categories/${category.name}`}
                            className="flex justify-center items-center rounded-lg hover:bg-[#f180a9] hover:text-white transition-colors"
                          >
                            <h4 className="font-medium"> {category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()}</h4>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-4">No hay categorías disponibles</div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <img src={imageCategory1} alt="Categoría" className="rounded-lg h-48 object-cover w-full" />
                      <img src={imageCategory2} alt="Categoría" className="rounded-lg h-48 object-cover w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Puente invisible */}
              <div className="absolute top-full -inset-x-20 h-4 bg-transparent pointer-events-none"></div>
            </div>

            {/* Otros enlaces */}
            <NavLink
              to="/blog"
              className={({ isActive }) => `inline-flex items-center pr-2 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                }`}
            >
              Blogs
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                }`}
            >
              Sobre Nosotros
            </NavLink>

            <NavLink
              to="/contacts"
              className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                }`}
            >
              Contacto
            </NavLink>



            <NavLink
              to="/envios"
              onClick={closeMobileMenu}
              className={({ isActive }) => `inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap ${isActive ? 'text-[#f180a9]' : 'text-gray-700 hover:text-[#f180a9]'
                }`}
            >
              Envíos
            </NavLink>

          </nav>

          {/* Right Section */}
          <div className="flex items-center pl-4 gap-4">
            <form className="hidden md:flex items-center" onSubmit={(e) => {
              e.preventDefault();
              navigate(`/products?search=${searchTerm}`);
            }}>
              <input
                type="text"
                placeholder="Buscar productos"
                className="px-4 py-2 ring-1 ring-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-pink-500 w-48 lg:w-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#f180a9] text-white px-4 py-2 rounded-r-full
                transition-colors h-10 cursor-pointer"
              >
                <FaSearch className="h-5 w-5" />
              </button>
            </form>

            <button
              onClick={handleCartClick}
              className="relative text-gray-700 cursor-pointer"
            >
              <FaShoppingCart className="h-6 w-6" />
              <span className="absolute -top-3 -right-2  bg-[#fff212] text-black text-xs w-5 h-5 rounded-full flex 
                items-center justify-center">
                {getCartCount()}
              </span>
            </button>

            <button
              onClick={handleReserveClick}
              className="w-full flex items-center justify-center gap-2 bg-[#f180a9] text-white py-2 px-4 rounded-lg hover:scale-105 cursor-pointer transition-colors"

            >
              Reservar
            </button>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 bg-white"
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
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Inicio
              </NavLink>

              <NavLink
                to="/new-products"
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Lo nuevo
              </NavLink>

              <NavLink
                to="/promotions"
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Promociones
              </NavLink>

              <NavLink
                to="/products"
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Productos
              </NavLink>

              <NavLink

                to="/categories/cuidado capilar"
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Categorías
              </NavLink>

              <NavLink
                to="/blog"
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Blogs
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Sobre Nosotros
              </NavLink>

              <NavLink
                to="/contacts"
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Contacto
              </NavLink>

              <NavLink
                to="/promotions"
                onClick={closeMobileMenu}
                className={({ isActive }) => `block py-2 px-4 rounded-lg ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'
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