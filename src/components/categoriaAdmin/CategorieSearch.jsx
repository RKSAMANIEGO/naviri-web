import React, { useState } from 'react'
import styles from '../../styles/productAdmin.module.css'

const CategorieSearch = ({getTextSerch}) => {
    const [textSearch , setTextSearch]=useState("")

    return (
        <div>
            <div className={styles.productSearch}>
                <h2>Gestión de Categorias</h2>
                <p>Administra tu catálogo de categoria para los productos. Puedes agregar, editar, eliminar categorias.</p>
                <div>
                    <label>
                        <input value={textSearch} onChange={(e)=>{
                            setTextSearch(e.target.value);
                            //getTextSerch(e.target.value);
                        }} className={styles.input} type='text'
                                placeholder='Buscar Categoria...'/> 
                        <i className="fa-solid fa-magnifying-glass iconSearch" onClick={()=> getTextSerch(textSearch)}></i>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CategorieSearch
