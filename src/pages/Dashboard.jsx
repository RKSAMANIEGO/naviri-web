import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import styles from '../styles/dashboard.module.css'
import ProductAdmin from './PageProductAdmin/ProductAdmin'
const Dashboard = () => {
    return (
        <section className={styles.dashboard}>
            <div className={styles.div}>
                <Sidebar />
            </div> 

            <div className={styles.divContent}>
                <ProductAdmin/>
            </div>
            
        </section>
    )
}

export default Dashboard
