import React, { useEffect, useState } from 'react'
import styles from '../../styles/producto.module.css'
import {products} from '../../utils/products'
import PaginationProducts from './PaginationProducts'
import ModalProducts from './ModalProducts'
import SearchProducts from './SearchProducts'

const ContentProducts = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [productSelected,setProductSelected]=useState({});
    const [textSearch,setTextSearch]=useState("");
    const [filterPrecio,setFilterPrecio]=useState("");
    const [productoFiltrado,setProductoFiltrado]=useState([]);

    const recibirTextSearch =(data)=>{
        setTextSearch(data);
    }
    const recibirFiltroPrecio=(precio)=>{
        setFilterPrecio(precio);
    }
    
    useEffect(()=>{
        if(textSearch) {
            const productsFilter = products.filter(product => product.subCategoria.toLowerCase().includes(textSearch.toLowerCase()));
            setProductoFiltrado(productsFilter);
        }
        else if (filterPrecio){
            const productsFilterPrecio= products.filter(product =>Number(product.precio)===Number(filterPrecio));
            setProductoFiltrado(productsFilterPrecio);
        }
        else if(!textSearch || !filterPrecio){
            setProductoFiltrado(products);
        }
    },[filterPrecio,textSearch])

    return (
    <>
        <SearchProducts recibirTextInput={recibirTextSearch} recibirValuePrecio={recibirFiltroPrecio} products={products}/>
        
        <section className={styles.contentProducts}>

            {/*FILTRO DE PRODUCTOS */}
            { productoFiltrado.map((product) => (
                <section onClick={()=>{
                    setIsOpen(true)  
                    const productById= products.find((prod)=> prod.id===product.id);
                    setProductSelected(productById);
                }}
                className={styles.sectionProducts} key={product.id} 
                >
                    <div style={{
                        width:"100%",
                        height:"190px",
                        marginBottom:"10px",
                        backgroundImage: `url(${product.imagen})`,  
                        backgroundSize: "80%",
                        backgroundPosition:"center 70%",
                        borderTopLeftRadius:"10px",
                        borderTopRightRadius:"10px",
                    }}>
                    </div>
                    <p className={styles.p}>{product.producto}</p>
                    <h4 className={styles.h4}>{product.subCategoria}</h4>
                    <p className={styles.p}>{product.descripcion}</p>
                    <h5 className={styles.h5}>S/{product.precio}</h5>
                    <section>
                        <button className='btn btn-secondary'><i className="fa-solid fa-cart-shopping"></i> Añadir</button>
                        <button className='btn btn-primary'>Comprar</button>
                    </section>
                </section>
            ))}

            <PaginationProducts/>
            <ModalProducts isOpen={isOpen} onClose={()=>setIsOpen(false)} product={productSelected}/>

        </section>
    </>
    )
}

export default ContentProducts
