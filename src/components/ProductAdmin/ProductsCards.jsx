import React, { useState } from 'react'
import Swal from 'sweetalert2'
import styles from '../../styles/productAdmin.module.css'
import {products} from '../../utils/products'
import ModalCrudProduct from './Modal/ModalCrudProduct'
import ModalProducts from '../../components/Products/ModalProducts'
const ProductsCards = () => {

    const [isOpenModal,setOpenModal] = useState(false)
    const [isOpenModalDetailsProduct,setOpenModalDetailsProduct] = useState(false)
    const [productSelected,setProductSelected]=useState({})
    return (

        <>
            <section className={styles.contentProductAdmin}>
                { products.map((product) => (
                    <section className={styles.sectionProducts} key={product.id} 
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
                            cursor:"pointer"
                        }}
                        onClick={()=>{
                            const productById= products.find((prod)=> prod.id===product.id);
                            setOpenModalDetailsProduct(true);
                            setProductSelected(productById)
                            console.log(productById);           
                        }}
                        >
                        
                        </div>
                                
                        <h4 className={styles.h4}>{product.subCategoria}</h4>
                        
                        <section className={styles.productsData}>
                            <div>
                                <p className={styles.p}>{product.producto}</p>

                                {product.id >=5 ?
                                    <p className={styles.p}><span className={styles.stockValid}><strong>{String(product.id).padStart(2,'0')}</strong></span> Unidades</p>
                                :
                                    <p className={styles.p}><span><strong>{String(product.id).padStart(2,'0')}</strong></span> Unidades</p>
                                }   
                                
                            </div>
                            <h5 className={styles.h5}>S/{product.precio}</h5>
                        </section>

                        <section>
                            <button onClick={()=> setOpenModal(true)}><i className="fa-regular fa-pen-to-square"></i> Editar</button>
                            <button onClick={()=>{
                                Swal.fire({
                                    title: '¿Estás seguro de eliminar este producto?',
                                    text:"Los cambios no se puede revertir",
                                    icon:"warning",
                                    showCancelButton:true,
                                    confirmButtonText:"Si, Eliminar",
                                    cancelButtonText:"Cancelar",
                                    cancelButtonColor:"rgb(38, 86, 218)",
                                    confirmButtonColor:"rgb(228, 34, 170)",
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
            <ModalCrudProduct isOpen={isOpenModal} onClose={()=>setOpenModal(false)} titleModal="updateProduct"/>
            <ModalProducts isOpen={isOpenModalDetailsProduct} onClose={()=>setOpenModalDetailsProduct(false)} product={productSelected}/>
        </>
    )
}

export default ProductsCards
                    