import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import styles from './producto.module.css' // Updated path
import PaginationProducts from './PaginationProducts' // Path remains relative
import SearchProducts from './SearchProducts' // Path remains relative
import { listProducts, productByName } from '../services/productsApi' // Updated path
import CartSidebar from '../../cart/components/CartSidebar'; // Updated path to new feature location
import { useCart } from '../../cart/context/CartContext';
import SearchAside from './SearchAside/SearchAside';
import { FilterOutlined } from '@ant-design/icons';
import NotFoundProducts from '../../../shared/animation/iconAnimation/notFoundProducts';
import SeccionScrollAnimation from '../../../shared/animation/SeccionScrollAnimation';
import { lanzarConfetti } from '../../../shared/animation/Confetti/confetti';


const ContentProducts = ({ categorie }) => {
    const [isOpenNavCategorie, setIsOpenNavCategorie] = useState(false);
    const [nameCategorie,setNameCategorie]=useState('todos');
    const [textSearch, setTextSearch] = useState("");
    const [filterPrecio, setFilterPrecio] = useState("");
    const [filterCategorie, setFilterCategorie] = useState("");
    const [productoFiltrado, setProductoFiltrado] = useState([]);
    const [dataProducts, setDataProducts] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [numPage, setNumPage] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(null);
    const { addToCart } = useCart();

    //responsive cards products
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);

    useEffect(() => {
        const widthResizable = () => setWidthWindow(window.innerWidth);

        window.addEventListener("resize", widthResizable);

        return () => window.removeEventListener("resize", widthResizable);
    }, [])


    // Obtener parámetros de búsqueda
    const [searchParams] = useSearchParams();

    // Recibir data de filtros productos, precio y categoria
    const recibirTextSearch = (data) => {
        setTextSearch(data);
    }

    // Actualizar búsqueda cuando cambia el parámetro de URL
    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            setTextSearch(searchQuery);
        }
    }, [searchParams]);


    const recibirFiltroPrecio = (precio) => {
        setFilterPrecio(precio);
    }
    const recibirFiltroCat = (categorie) => {
        setFilterCategorie(categorie);
    }

    //recibir pagina
    const recibirPagina = (pagina) => {
        setNumPage(pagina);
    }

    //siguiente pagina
    const pageNext = () => {
        if (numPage < totalPages) {
            setNumPage(numPage + 1);
        }
    }

    //Consumir la lista de Productos
    const listarProductos = async (nPage) => {
        const productos = await listProducts(nPage);
        if (productos) {
            setDataProducts(productos.data.data);
            setTotalPages(productos.data.last_page);
            console.log("Ultima Pagina" + productos.data.last_page);
            setTotalProducts(productos.data.total);
        }

    }
    const listAllProducts = async (nPage, limit) => {
        const productos = await listProducts(nPage, limit);
        if (productos) {
            setAllProducts(productos.data.data);
        }
    }

    useEffect(() => {
        listarProductos(numPage);
        listAllProducts(1, totalProducts)
    }, [numPage, totalProducts]);


    useEffect(() => {
        if (dataProducts) {
            if (textSearch) {
                const productsFilter = allProducts.filter(product => product.name.toLowerCase().includes(textSearch.toLowerCase()));
                    setProductoFiltrado(productsFilter);

            }
            else if (filterPrecio) {
                const productsFilterPrecio = allProducts.filter(product => Number(product.price) === Number(filterPrecio));
                setProductoFiltrado(productsFilterPrecio);
            }
            else if (filterCategorie) {
                //const productsFilterCat=allProducts.filter(product => product.categories.some(subCat=>subCat.sub_categories.some(obj=> obj.name.toLowerCase()=== filterCategorie.toLowerCase())));
                const productsFilterCat = allProducts.filter(product => product.categories.some(subCat => subCat.name.toLowerCase() === filterCategorie.toLowerCase()));
                setProductoFiltrado(productsFilterCat); // <-- Soluciona el filtro por categoría
                console.log(productsFilterCat);
            }
            else if (categorie && categorie.trim() !== '' && allProducts.length > 0) {
                const productsFilterCateg = allProducts?.filter(product => product.categories.some(subCat => subCat.name.toLowerCase().includes(categorie.toLowerCase())));
                console.log(productsFilterCateg);
                localStorage.setItem("nameCategorie", categorie || '');
                window.dispatchEvent(new Event("localStorageUpdated"));

                setProductoFiltrado(productsFilterCateg);
            }
            else if (!textSearch || !filterPrecio) {
                setProductoFiltrado(dataProducts);
            }
        }
    }, [dataProducts, filterPrecio, textSearch, filterCategorie, allProducts, categorie])


    //CART PRODUCT
    const handleAddToCart = (product) => {
        addToCart(product);
        lanzarConfetti();
    };

    //CATEGORIA PARA EL NAV
    const categories = allProducts?.map(prod => prod.categories.map(subCat => subCat.name).join());
    const listCategorie = new Set(categories.flat());

    const listProductsByCat=(cat)=>{
        if(cat!=='all'){
            const productByCat = allProducts.filter(product => product.categories.some(subCat => subCat.name.toLowerCase() === cat.toLowerCase()));
            setProductoFiltrado(productByCat);
            setNameCategorie(cat.toLowerCase());
            setIsOpenNavCategorie(false);
        
        }else{
            setIsOpenNavCategorie(false);
            setNameCategorie("todos");
            setProductoFiltrado(dataProducts);
        }


    }

    return (
        <>
            <SearchProducts recibirTextInput={recibirTextSearch} />
            <div className={`${widthWindow < 875 ? 'flex flex-col' : `${styles.mainProducts}`}`}>
    
                    {/*FILTER CATEGORIE CHECKBOX*/}
        
                {allProducts.length > 0 && <SearchAside products={allProducts} recibirValuePrecio={recibirFiltroPrecio} recibirCategories={recibirFiltroCat} />}
                
                    {/*FILTER CATEGORIE CHECKBOX MOVILE */}
                {widthWindow < 875 && <div className='flex items-center gap-2 pt-[20px] px-[20px] md:px-[80px]'>
                                        <label className='flex gap-1 w-[auto] cursor-pointer text-sm  sm:text-[16px] text-pink-500  hover:text-gray-600' onClick={() => setIsOpenNavCategorie(!isOpenNavCategorie)}>FILTRAR <FilterOutlined /> </label>
                                        {!isOpenNavCategorie ? <span className='capitalize text-pink-400 text-sm  sm:text-[16px]'>&raquo; {nameCategorie} </span> : '' } 
                                    </div> }
            <section className={styles.wrapperProducts}>
            
                <section id="products" className={styles.contentProducts} >
                    
                    {/*FILTRO DE PRODUCTOS */}
                    {productoFiltrado.length > 0  ? 
                    
                    productoFiltrado.map((product) => (
                
                    <SeccionScrollAnimation direction='rigth'>
                        <section  className={`${widthWindow < 450 ? ' relative group overflow-hidden   w-[145px] h-[230px] rounded-sm border border-[#F1EFEF] transition-all duration-400 ease-in-out text-center  hover:shadow-pink-400 hover:shadow-sm'
                            : 'relative group overflow-hidden    w-[200px] md:w-[300px] lg:w-[330px] h-[290px] md:h-[350px]  lg:h-[380px] rounded-xl border border-[#F1EFEF] transition-all duration-400 ease-in-out text-center  hover:shadow-pink-500 hover:shadow-md'}`} key={product.id}>

                            <Link to={`/products/${encodeURIComponent(product.name)}`} >
                                <div className="overflow-hidden group-hover:scale-105 flex items-end w-full h-2/3 cursor-pointer object-content bg-[position:center_70%] bg-[length:100%_auto] rounded-t-sm sm:rounded-t-xl transition-all duration-500 ease-in-out"
                                    style={{
                                        backgroundImage: `url(${product.image[0].url})`
                                    }}

                                    onClick={async () => {
                                        //setIsOpen(true)
                                        if (textSearch != null || filterPrecio != null || filterCategorie != null) {

                                            const productById = await productByName(product.name);
                                            productById && console.log(productById) //setProductSelected(productById.data.data[0]);
                                        } else {
                                            const productById = await productByName(product.name);
                                            productById && console.log(productById) //setProductSelected(productById.data.data[0]);
                                        }
                                    }}>
                                </div>
                                {product.discount > 0 && <span className="absolute top-[5%] right-[3%] text-[10px] md:text-lg bg-pink-600 text-white px-2 py-1 rounded-sm">-{product.discount}%</span> }
                            
                            </Link>

                            <div className={`${widthWindow < 450 ? 'group-hover:-translate-y-6' : 'group-hover:-translate-y-7'}`}>
                                <label className={`${widthWindow < 450 ? 'hidden w-full bg-gray-200/70  group-hover:flex justify-evenly  py-2 text-orange-500 text-[10px]'
                                    : 'hidden w-full bg-gray-200/70  group-hover:flex justify-evenly  py-2 text-orange-500 text-sm md:text-md'}`} >
                                    &#9733; &#9733; &#9733; &#9733; &#9733;
                                    <span className='text-pink-500 hover:underline hover:text-gray-800'
                                        onClick={() => handleAddToCart(product)}>LO QUIERO &#10084;
                                    </span>
                                </label>

                                <p className={`${widthWindow < 450 ? 'text-[9px] mt-2 capitalize' : `${styles.textCategorie}`}`}>{product.categories.map(subCat => subCat.sub_categories.map(obj => obj.name.toLowerCase()))}</p>
                                <h4 className={`${widthWindow < 450 ? 'truncate px-1 text-[11px] leading-3 font-[700]' : `${styles.titleProducts}`}`}>{product.name.toUpperCase()}</h4>

                                {product.discount > 0 && product.discount !== null ?
                                    (<div className={`${widthWindow < 450 ? 'flex' : `${styles.wrapperDscto}`}`}>
                                        <s className={`${widthWindow < 450 ? 'text-[10px]' : `${styles.s}`}`}>S/{product.price}</s>
                                        <h6 className={`${widthWindow < 450 ? 'text-pink-400 font-bold text-[10px]' : `${styles.dscto}`}`} >Ahora  S/{(product.price - (product.price * product.discount / 100)).toFixed(2)}</h6>
                                    </div>)
                                    :
                                    (<div className={styles.wrapperDscto}>
                                        <h5 className={styles.sinDscto}>S/{product.price}</h5>
                                    </div>)
                                }
                            </div>
                        </section>
                    </SeccionScrollAnimation>

                    ))
                    
                    :
                    <p className='flex flex-col items-center text-gray-500 w-[80%] font-bold'><NotFoundProducts/> Producto No Encontrado</p>
                    
                    }
                
                </section>
            
                    
                {totalPages && productoFiltrado.length > 5 && <PaginationProducts numPage={totalPages} handlerPagina={recibirPagina} nextPage={pageNext} nextPageDisabled={numPage} />}
            
                <CartSidebar />
            </section>
        
            
                    {/* NAV BAR CATEGORIE MOVILE*/}
                <nav className={`fixed top-0 right-0 h-[100vh] w-[50%] sm:w-[40%] bg-pink-400 z-[100] transition-transform duration-500 transform 
                                ${isOpenNavCategorie ? 'translate-x-0':'translate-x-full'}  flex justify-center items-center ` }>
                    {allProducts.length > 0 &&
                        <ul>
                            <li className='font-bold text-pink-300'>CATEGORIAS</li>
                            {[...listCategorie].map((cat,index) => (
                                <li key={index} className='text-[13px] sm:text-[15px] text-white capitalize cursor-pointer p-1 hover:text-pink-300' onClick={()=> listProductsByCat(cat)}>{cat.toLowerCase()}</li>
                            ))}
                            <li className='text-[12px] text-pink-300 border-[1px] border-pink-300 text-center rounded-sm py-1 m-3 cursor-pointer hover:bg-pink-200 hover:text-pink-400' onClick={()=> listProductsByCat('all')}>Limpiar</li>
                        </ul>
                    }
                </nav>
            </div>
        </>


    )

}

export default ContentProducts
