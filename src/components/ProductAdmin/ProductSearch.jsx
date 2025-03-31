import React, { useState } from 'react'
import styles from '../../styles/productAdmin.module.css'
const ProductSearch = ({setRecibirEstilo}) => {

    const [onChangeStyle,setOnChangeStyle]=useState(false);

    const cambiarEstilo =()=>{
        setRecibirEstilo(!onChangeStyle);
        setOnChangeStyle(!onChangeStyle);
    }

    return (
        <div className={styles.productSearch}>
            <h2>Gestión de Productos</h2>
            <p>Administra tu catálogo de productos naturales. Puedes agregar, editar, eliminar y buscar productos.</p>
            <div>
                <input className={styles.input} type='text' placeholder='Buscar productos    '/> 
                <i className="fa-solid fa-grip" onClick={cambiarEstilo}></i>
            </div>
        </div>
    )
}
export default ProductSearch
