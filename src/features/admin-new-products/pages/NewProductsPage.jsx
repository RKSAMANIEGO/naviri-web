import React from 'react'
import { Input ,Tooltip} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from '../styles/NewProducts.module.css'
import ModalNewProducts from '../components/modalNewProducts/ModalNewProducts'
import TableNewProducts from '../components/tableNewProducts/TableNewProducts'

const NewProductsPage = () => {
    const {Search} = Input;
    const [isOpen, setIsOpen] =useState(false);
    return (
    <>
        <div className={styles.wrapperQuestions}> 
            <h1>Productos Nuevos</h1>
            <Search  placeholder='Ingrese la Pregunta...' enterButton className={styles.search}/>
            <TableNewProducts/>
            <Tooltip title="Agregar Una Pregunta"  placement="left" overlayInnerStyle={{background:"white",color:"gray",boxShadow:"0 0 15px gray"}}>
                <PlusOutlined className={styles.addOptions} onClick={()=>setIsOpen(true)}/>
            </Tooltip>
        
        </div>
            <ModalNewProducts isOpen={isOpen} onClosed={()=>setIsOpen(false)}/>
    </>
    )
}

export default NewProductsPage
