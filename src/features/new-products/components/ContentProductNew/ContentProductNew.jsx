import React, { useEffect, useState } from 'react'
import { listProducts } from '../../services/productsApi'
import styles from '../../styles/producto.module.css'
import { useCart } from '../../../cart/context/CartContext';
import CartSidebar from '../../../cart/components/CartSidebar';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
const ContentProductNew = () => {

    const [dataProducts,setDataProducts]=useState(null);
    const [totalProducts,setTotalProducts]=useState(0);
    const [dataFilterProducts,setDataFilterProducts]=useState(null);
    const { addToCart } = useCart();

    //Consumir la lista de Productos
    const listarProductos =async(nPage) => {
        const productos= await listProducts(nPage);
        productos && setTotalProducts(productos.data.total);       
    }

    const listAllProducts =async(nPage,limit) => {
        const productos= await listProducts(nPage,limit);
        if(productos){
            setDataProducts(productos.data.data);
        }
    }

    useEffect(()=>{
        listarProductos(1);
    },[])

    useEffect(()=>{
        totalProducts && listAllProducts(1,totalProducts);
    },[totalProducts])

    //Validar rango de fecha de cada producto
    const filterDateProducts= ()=>{
        const dateNow=new Date();

        const dateFilter=new Date();
        dateFilter.setDate(dateNow.getDate()-7);

        const productFilterDate = dataProducts.filter(products => {
            const dateProducts =new Date( products.created.replace(" ","T"));
            return dateProducts >= dateFilter && dateProducts<= dateNow;
        });
        setDataFilterProducts(productFilterDate);
    }

    useEffect(()=>{
        dataProducts && filterDateProducts();
    },[dataProducts])


    //CART PRODUCT
    const handleAddToCart = (product) => {
        addToCart(product);
    };

    //BTN WSP 
    const handleWhatsappCheckout = (product) => {
        const message = `¡Hola! Me interesa comprar el producto ${product.name} por ${product.price}. ¿Podría darme más información?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/+51927987259?text=${encodedMessage}`, '_blank');
    };
    return (
    <div className={styles.containerProducts}>
        <section className={styles.contentProducts} >
                    {/*FILTRO DE PRODUCTOS */}
                    { dataFilterProducts?.map((product) => (
                        <section className={styles.sectionProducts} key={product.id}>
                            <div className={styles.divImagen} style={{
                                backgroundImage: `url(${product.image.url})`
                            }}>

                            </div>
                            <p className={styles.p}>{product.categories.map(subCat=>subCat.sub_categories.map(obj=>obj.name))}</p>
                            <h4 className={styles.h4}>{product.name.toUpperCase()}</h4>
        
                        {product.discount > 0 && product.discount !==null ? (

                            <div className={styles.wrapperDscto}>
                                <s>S/{product.price}</s>
                                <h6 className={styles.dscto}>Ahora  S/{(product.price-(product.price*product.discount/100)).toFixed(2)}</h6>
                            </div>

                            )  
                            :
                            (
                            <div className={styles.wrapperDscto}>
                                <h5 className={styles.sinDscto}>S/{product.price}</h5>
                            </div>
                            )
                        }
        
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
                                    <FaWhatsapp/> Comprar
                                </button>
                            </section>
                        </section>
                    ))}
                    <CartSidebar />
        </section>
    </div>   
    )
}

export default ContentProductNew
