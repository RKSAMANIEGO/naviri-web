import React, { useState } from 'react'
import ProductSearch from '../../components/ProductAdmin/ProductSearch'
import ProductsTable from '../../components/ProductAdmin/ProductsTable'
import ProductsCards from '../../components/ProductAdmin/ProductsCards';
import styles from '../../styles/productAdmin.module.css'
import ModalCrudProduct from '../../components/ProductAdmin/Modal/ModalCrudProduct';
const ProductAdmin = () => {
    const[onChangeStyleProducts,setOnChangeStyleProducts]=useState(false);
    const[isOpenModal,setOpenModal]=useState(false);

    const recibirEstilo =(data)=>{
        setOnChangeStyleProducts(data);
    }
    return (
        <>
            <ProductSearch setRecibirEstilo={recibirEstilo}/>

            {onChangeStyleProducts ? 
                <ProductsCards/>   :  <ProductsTable/>
            }
            
            <div className={styles.addProduct} onClick={()=> setOpenModal(true)}>
                <i className="fa-solid fa-plus"></i>
            </div>
            <ModalCrudProduct isOpen={isOpenModal} onClose={()=> setOpenModal(false)}/>
        </>
    )
}

export default ProductAdmin
