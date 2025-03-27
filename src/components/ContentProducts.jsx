import React from 'react'
import styles from '../styles/producto.module.css'
import {products} from '../utils/products'
import PaginationProducts from './PaginationProducts'

const ContentProducts = () => {
    return (
        <section className={styles.contentProducts}>
            {        products.map((product) => (
            <section className={styles.sectionProducts} key={product.id}>
                <div style={{
                    width:"100%",
                    height:"190px",
                    marginBottom:"10px",
                    /* backgroundImage: `url(${aceiteCadendula})`,*/
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
        </section>
    )
}

export default ContentProducts
