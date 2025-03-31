import React from 'react'
import styles from '../../styles/sidebar.module.css'
const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <h3 className={styles.h3}><i className="fa-solid fa-circle-user"></i> Panel Administrativo</h3>
            
            <section className={styles.wrapperSidebar}>
                <ul>
                    <li><i className="fa-solid fa-hand-holding-droplet"></i>Productos</li>
                    <li><i className="fa-solid fa-handshake"></i> Clientes</li>
                    <li><i className="fa-solid fa-comments"></i> Comentarios</li>
                </ul>
                <label><i className="fa-solid fa-list-ul"></i> Más</label> 

            </section>
        </div>

        
    )
}

export default Sidebar
