import React, { useState } from 'react'
import styles from '../styles/productAdmin.module.css' // Updated path
const ProductSearch = ({setRecibirEstilo,recibirTextSearch}) => {

    const [onChangeStyle,setOnChangeStyle]=useState(false);
    const [searchProduct,setSearchProduct]=useState('');

    const cambiarEstilo =()=>{
        setRecibirEstilo(!onChangeStyle);
        setOnChangeStyle(!onChangeStyle);
    }

    return (
        <div className={styles.productSearch}>
            <h2>Gestión de Productos</h2>
            <p>Administra tu catálogo de productos naturales. Puedes agregar, editar, eliminar y buscar productos.</p>
            <div>
                <label>
                    <input className={styles.input} type='text' value={searchProduct} onChange={(e)=>{
                        setSearchProduct(e.target.value);

                    }} placeholder='Buscar por Productos o Categorias'/>
                    <i className="fa-solid fa-magnifying-glass iconSearch" onClick={()=>  recibirTextSearch(searchProduct)}></i>
                </label>

                <i className="fa-solid fa-grip" onClick={cambiarEstilo}></i>
            </div>
        </div>
    )
}
export default ProductSearch