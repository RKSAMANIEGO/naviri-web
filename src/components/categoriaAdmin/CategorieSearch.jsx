import React from 'react'
import styles from '../../styles/productAdmin.module.css'

const CategorieSearch = () => {

    return (
        <div>
            <div className={styles.productSearch}>
                <h2>Gestión de Categorias</h2>
                <p>Administra tu catálogo de categoria para los productos. Puedes agregar, editar, eliminar categorias.</p>
                <div>
                    <label>
                        <input  className={styles.input} type='text' 
                                placeholder='Buscar Categoria...'/> 
                        <i className="fa-solid fa-magnifying-glass iconSearch"></i>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CategorieSearch
