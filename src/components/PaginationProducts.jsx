import React from 'react'
import styles from '../styles/producto.module.css'

const PaginationProducts = () => {
    return (
        <div className={styles.pagination}>
            <button className={styles.button}>1</button>
            <button className={styles.button}>2</button>
            <button className={styles.button}>3</button>
            <button>Siguiente</button>        
        </div>
    )
}

export default PaginationProducts
