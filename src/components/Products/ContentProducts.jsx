import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import styles from '../../styles/producto.module.css'
import PaginationProducts from './PaginationProducts'
import ModalProducts from './ModalProducts'
import SearchProducts from './SearchProducts'
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import { listProducts, productByName } from '../../services/productService'
import { useCart } from '../../context/CartContext';
import CartSidebar from '../cart/CartSidebar';

const ContentProducts = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [productSelected,setProductSelected]=useState(null);
    const [textSearch,setTextSearch]=useState("");
    const [filterPrecio,setFilterPrecio]=useState("");
    const [filterCategorie,setFilterCategorie]=useState("");
    const [productoFiltrado,setProductoFiltrado]=useState([]);
    const [dataProducts,setDataProducts]=useState(null);
    const [totalPages,setTotalPages]=useState(null);
    const [numPage,setNumPage]=useState(1);
    const [allProducts,setAllProducts]=useState([]);
    const [totalProducts,setTotalProducts]=useState(null);
    const { addToCart } = useCart();

    // Obtener parámetros de búsqueda
    const [searchParams] = useSearchParams();

    // Recibir data de filtros productos, precio y categoria
    const recibirTextSearch =(data)=>{
        setTextSearch(data);
    }

    // Actualizar búsqueda cuando cambia el parámetro de URL
    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            setTextSearch(searchQuery);
        }
    }, [searchParams]);
    const recibirFiltroPrecio=(precio)=>{
        setFilterPrecio(precio);
    }
    const recibirFiltroCat=(categorie)=>{
        setFilterCategorie(categorie);
    }

    //recibir pagina
    const recibirPagina=(pagina)=>{
        setNumPage(pagina);
    }

    //siguiente pagina
    const pageNext=()=>{
        if(numPage<totalPages){
            setNumPage(numPage+1);
        }
    }
    
    //Consumir la lista de Productos
    const listarProductos =async(nPage) => {
        const productos= await listProducts(nPage);
        if(productos){
            setDataProducts(productos.data.data);
            setTotalPages(productos.data.last_page);
            setTotalProducts(productos.data.total);
        }
    
    }
    const listAllProducts =async(nPage,limit) => {
        const productos= await listProducts(nPage,limit);
        if(productos){
            setAllProducts(productos.data.data);
        }
    } 

    useEffect(()=>{
        listarProductos(numPage);
        listAllProducts(1,totalProducts)
    },[numPage,totalProducts]);

    useEffect(()=>{
        if(dataProducts){
            if(textSearch) {
                const productsFilter = allProducts.filter(product => product.name.toLowerCase().includes(textSearch.toLowerCase()));
                setProductoFiltrado(productsFilter);
            }
            else if (filterPrecio){
                const productsFilterPrecio= allProducts.filter(product =>Number(product.price)===Number(filterPrecio));
                setProductoFiltrado(productsFilterPrecio);
            }
            else if (filterCategorie){
                const productsFilterCat=allProducts.filter(product => product.categories.some(subCat=>subCat.sub_categories.some(obj=> obj.name.toLowerCase()=== filterCategorie.toLowerCase())))
                console.log(productsFilterCat);
                setProductoFiltrado(productsFilterCat);
            }
            else if(!textSearch || !filterPrecio){
                setProductoFiltrado(dataProducts);
            }     
        }
    },[dataProducts,filterPrecio,textSearch,filterCategorie,allProducts])

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleWhatsappCheckout = (product) => {
        const message = `¡Hola! Me gustaría comprar el producto ${product.name} de S/${product.price}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/+51935427263?text=${encodedMessage}`, '_blank');
    };

    return (
    <>
        <SearchProducts recibirTextInput={recibirTextSearch} recibirValuePrecio={recibirFiltroPrecio} recibirCategories={recibirFiltroCat} products={allProducts}/>
        <div className={styles.containerProducts}>
        <section className={styles.contentProducts} >

            {/*FILTRO DE PRODUCTOS */}
            { productoFiltrado.map((product) => (
                <section className={styles.sectionProducts} key={product.id}>
                    <div style={{
                        width:"100%",
                        height:"190px",
                        marginBottom:"10px",
                        backgroundImage: `url(${product.image.url})`,  
                        backgroundSize: "80%",
                        backgroundPosition:"center 60%",
                        borderTopLeftRadius:"10px",
                        borderTopRightRadius:"10px",
                        cursor:"pointer"
                    }}
                    onClick={async ()=>{
                        setIsOpen(true)  
                        if(textSearch!=null || filterPrecio!=null || filterCategorie!=null){
                    
                            const productById = await productByName(product.name);
                            productById &&  setProductSelected(productById.data.data[0]);
                        }else{
                            const productById = await productByName(product.name);
                            productById &&  setProductSelected(productById.data.data[0]);

                        }
                    }}>
                    </div>
                    <p className={styles.p}>{product.categories.map(subCat=>subCat.sub_categories.map(obj=>obj.name))}</p>
                    <h4 className={styles.h4}>{product.name.toUpperCase()}</h4>
                    {/**<p className={styles.p}>{product.descripcion}</p>*/} 
                    <h5 className={styles.h5}>S/{product.price}</h5>
                    <section className={styles.productActions}>
                        <button 
                            className={`btn btn-secondary ${styles.addToCartBtn}`}
                            onClick={() => handleAddToCart(product)}
                        >
                            <FaShoppingCart /> Añadir
                        </button>
                        <button 
                            className={`btn btn-primary ${styles.buyBtn}`}
                            onClick={() => handleWhatsappCheckout(product)}
                        >
                            <FaWhatsapp /> Comprar
                        </button>
                    </section>
                </section>
            ))}

            {totalPages && <PaginationProducts numPage = { totalPages } handlerPagina={recibirPagina} nextPage={pageNext}/>}
            {productSelected!=null && <ModalProducts isOpen={isOpen} onClose={()=>setIsOpen(false)} product={productSelected} title="productCustomer"/> } 
            <CartSidebar />
        </section>
        </div>
    </>
    )
}

export default ContentProducts
