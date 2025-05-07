import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import styles from '../styles/productAdmin.module.css' // Updated path
import ModalCrudProduct from './Modal/ModalCrudProduct' // Path remains relative to component
import ModalProducts from './Modal/ModalProducts' // Updated path
import { productByName , deleteProduct } from '../services/adminProductsApi' // Updated path
import NotFoundProducts from '../../../shared/animation/iconAnimation/notFoundProducts'
const ProductsCards = ({products,productFilter,productDelete,isUpdateProduct}) => {

    const [isOpenModal,setOpenModal] = useState(false)
    const [isOpenModalDetailsProduct,setOpenModalDetailsProduct] = useState(false)
    const [productSelected,setProductSelected]=useState({})
    const [productsAll, setProductsAll]=useState(products);
    const [confirmProductDelete,setConfirmProductDelete]=useState(false);

    useEffect(()=>{
        const filterProduc= productFilter();
        filterProduc ? setProductsAll(filterProduc) : setProductsAll(products)
    },[productFilter,products])


    return (

        <>
            <section className={styles.contentProductAdmin}>
                {productsAll.length > 0 ? productsAll.map((product) => (
                    <section className={styles.sectionProducts} key={product.id}
                    >
                        <div style={{
                            width:"100%",
                            height:"220px",
                            marginBottom:"10px",
                            backgroundImage: `url(${product.image.url})`,
                            backgroundSize: "100%",
                            backgroundPosition:"center",
                            borderTopLeftRadius:"10px",
                            borderTopRightRadius:"10px",
                            cursor:"pointer"
                        }}
                        onClick={async()=>{

                            const productById = await productByName(product.name);
                            productById &&  setProductSelected(productById.data.data[0]);
                            setOpenModalDetailsProduct(true);

                        }}
                        >

                        </div>

                        <h4 className={styles.h4}>{product.name.toUpperCase()}</h4>
                        <p className={styles.p}>{product.categories.map(subCat=>subCat.sub_categories.map(obj=>obj.name.toLowerCase()))}</p>
                        <section className={styles.productsData}>
                            <div>


                                {product.stock >15 ?
                                    <p className={styles.p}><span className={styles.stockValid}><strong>{String(product.stock).padStart(2,'0')}</strong></span> Unidades</p>
                                :
                                    <p className={styles.p}><span><strong>{String(product.stock).padStart(2,'0')}</strong></span> Unidades</p>
                                }

                            </div>
                            <h5 className={styles.h5}>S/{product.price}</h5>
                        </section>

                        <section>
                            {/** BOTON ACTUALIZAR */}
                            <button onClick={async()=> {
                                localStorage.setItem("nameProduct",product.name);
                                const productById = await productByName(product.name);
                                productById &&  setProductSelected(productById.data.data[0]);
                                setOpenModal(true)
                            }}><i className="fa-regular fa-pen-to-square"></i> Editar</button>

                            {/** BOTON ELIMINAR */}
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
                                }).then(async(result) => {
                                    if(result.value){
                                        const response = await deleteProduct(product.name)
                                        if(response.status===200){
                                            Swal.fire({
                                                title: 'Producto Eliminado',
                                                text:"Se Elimino con exito",
                                                icon:"success",
                                                timer: 2000
                                            })
                                            setConfirmProductDelete(!confirmProductDelete);
                                            productDelete(!confirmProductDelete);
                                        }
                                    }
                                })
                            }}><i className="fa-solid fa-trash-can"></i> Eliminar</button>
                        </section>
                    </section>

            ))
            :
            <p className='flex flex-col items-center text-gray-500 w-[80%] font-bold'><NotFoundProducts/> Producto No Encontrado</p>

        }

            </section>
            {(isOpenModal) && <ModalCrudProduct isOpen={isOpenModal} onClose={()=>setOpenModal(false)} titleModal="updateProduct" confirmActualizacionProducto={(confirm)=> isUpdateProduct(confirm) }  productPutTable={productSelected}/>}
            <ModalProducts isOpen={isOpenModalDetailsProduct} onClose={()=>setOpenModalDetailsProduct(false)} product={productSelected} title="productAdmin"/>

            </>
    )
}

export default ProductsCards