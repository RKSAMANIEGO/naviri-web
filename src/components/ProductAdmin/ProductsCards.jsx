import React from 'react'
import Swal from 'sweetalert2'
import styles from '../../styles/productAdmin.module.css'
import {products} from '../../utils/products'
const ProductsCards = () => {
    return (
        <>
            <section className={styles.contentProductAdmin}>
                { products.map((product) => (
                    <section onClick={()=>{
                                const productById= products.find((prod)=> prod.id===product.id);
                                console.log(productById);
                    }}
                    className={styles.sectionProducts} key={product.id} 
                    >
                        <div style={{
                            width:"100%",
                            height:"220px",
                            marginBottom:"10px",
                            backgroundImage: `url(${product.imagen})`,  
                            backgroundSize: "100%",
                            backgroundPosition:"center",
                            borderTopLeftRadius:"10px",
                            borderTopRightRadius:"10px",
                        }}>
                        
                        </div>
                                
                        <h4 className={styles.h4}>{product.subCategoria}</h4>
                        
                        <section className={styles.productsData}>
                            <div>
                                <p className={styles.p}>{product.producto}</p>

                                {product.id >=5 ?
                                    <p className={styles.p}><span className={styles.stockValid}><strong>{product.id}</strong></span> Unidades</p>
                                :
                                    <p className={styles.p}><span><strong>{product.id}</strong></span> Unidades</p>
                                }   
                                
                            </div>
                            <h5 className={styles.h5}>S/{product.precio}</h5>
                        </section>

                        <section>
                            <button><i className="fa-regular fa-pen-to-square"></i> Editar</button>
                            <button onClick={()=>{
                                Swal.fire({
                                    title: '¿Estás seguro de eliminar este producto?',
                                    text:"Los cambios no se puede revertir",
                                    icon:"warning",
                                    showCancelButton:true,
                                    confirmButtonText:"Si, Eliminar",
                                    cancelButtonColor:"rgb(196, 22, 13)",
                                    confirmButtonColor:" rgb(26, 47, 210)"
                                }).then(result => {
                                    if(result.value){
                                        console.log("Se Elimino el Producto con ID "+product.id);
                                    }else{
                                        console.log("Nose Elimino el Producto con ID "+product.id);
                                    }
                                })
                            }}><i className="fa-solid fa-trash-can"></i> Eliminar</button>
                        </section>
                    </section>
            ))}
            </section>
        </>
    )
}

export default ProductsCards
                    