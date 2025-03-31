import React from 'react'
import ModalProducto from 'react-modal'
import styles from '../../../styles/productAdmin.module.css';
const ModalCrudProduct = ({isOpen,onClose}) => {

    const customStyles= {
        content:{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f9f9f9',
            padding: '10px 30px',
            height:"400px",
            width:"700px",
        },
        overlay:{
            backgroundColor: 'rgba(0,0,0,0.5)',
        }
        
    }

    return (
        <ModalProducto
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
        >
        <div className={styles.productoAdminCrud}>
            <h3>Nuevo Producto</h3>
            <p>Añade un nuevo producto a tu catálogo</p>
            <form className={styles.form}>
                <section className={styles.sectionFirts}>
                    <label>Titulo
                        <input type='text' placeholder='Nombre del producto'/>
                    </label>
                    
                    <label>Categoria
                        <select>
                            <option value=''>Selecione una categoria</option>
                        </select>
                    </label>

                    <div className={styles.div}>
                        <label>Precio
                            <input type='number' value={0}/>
                        </label>

                        <label>Stock
                            <input type='number' value={0}/>
                        </label>

                    </div>
                </section>

                <section className={styles.sectionLast}>
                    <label>Imagen del producto
                        <div>
                            <p>Arrastra una imagen o haz clic para seleccionar</p>
                            <input type='file't />
                        </div>
                    </label>
                    <label className={styles.descripcion}>Descripcion
                        <textarea placeholder='Nombre del Producto'/>
                    </label>
                </section>
            </form>
        

        </div>

        </ModalProducto>
    )
}
export default ModalCrudProduct
