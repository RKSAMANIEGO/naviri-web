import React from 'react'
import styles from '../../styles/producto.module.css'


const OptionsProducts = () => {
    return (
        <section className={styles.options}>
            <a href=""><i className="fa-solid fa-plus"></i></a>
            <a href=""><i className="fa-solid fa-cart-shopping"></i></a>
            <a href=""><i className="fa-solid fa-shield"></i></a>
            <a href=""><i className="fa-solid fa-location-dot"></i></a>
        </section>
    )
}

export default OptionsProducts
