import React from 'react'
import ModalProducto from 'react-modal'
import styles from '../../../styles/productAdmin.module.css';
const ModalCrudProduct = ({isOpen,onClose,titleModal}) => {

    let title="";
    let descripcion="";

    const customStyles= {
        content:{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f9f9f9',
            padding: '20px 30px',
            height:"470px",
            width:"750px",
        },
        overlay:{
            backgroundColor: 'rgba(0,0,0,0.5)',
        }
        
    }

    if(titleModal==="updateProduct"){
        title="Editar Producto"
        descripcion="Modifica los detalles del producto"
    }else{
        title="Nuevo Producto"
        descripcion="Añade un nuevo producto a tu catálogo"
    }

    return (
        <ModalProducto
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
        >
        <div className={styles.productoAdminCrud}>
            <h3>{title}</h3>
            <p>{descripcion}</p>
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
                            <i className="fa-solid fa-cloud-arrow-down"></i>
                            <p>Arrastra una imagen o haz clic para seleccionar</p>
                            <input  type='file' id='txtImage'/>
                            <label htmlFor="txtImage">
                              Seleccionar Imagen
                            </label>
                            
                        </div>
                    </label>
                    <label className={styles.descripcion}>Descripcion
                        <textarea placeholder='Nombre del Producto' />
                    </label>

                    <div className={styles.wrapperBtnProducts}>
                       {/**  <button>Cancelar</button>*/}
                        <button>{title}</button>
                    </div>
                </section>
            </form>

            <label onClick={onClose} className={styles.closeModal}>&#215;</label>
        </div>

        </ModalProducto>
    )
}
export default ModalCrudProduct
