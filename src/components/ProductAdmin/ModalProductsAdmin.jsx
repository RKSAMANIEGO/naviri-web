
import Modal from 'react-modal'
import styles from '../../styles/producto.module.css'
import { useEffect, useState } from 'react'
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';

Modal.setAppElement("#root")
    
const ModalProductsAdmin = ({isOpen, onClose, product, title}) => {

    console.log(product);
    
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        // Actualizar el estado cuando cambia el tamaño de la ventana
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    background: "rgba(0, 0, 0, 0.5)",
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                content:{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90vw",
                    maxWidth: "750px",
                    height: isDesktop ? "90vh" : "85vh",
                    maxHeight: isDesktop ? "600px" : "400px",
                    padding: "0",
                    border: "none",
                    overflow: "auto",
                    borderRadius: "10px",
                    backgroundColor: "white"
                }
            }}
        >
            {(product && isOpen) &&
            <div className={styles.modalProducts}>
                <section className={styles.section} style={
                    {
                        backgroundImage: `url(${product.image.url})`,
                    }
                }>
                    
                </section>
                <section className={styles.sectionLast}>
                    <h2 className={styles.h2}>{product.name.toUpperCase()}</h2>
                    <p className={styles.p}>{product.subcategories[0].name}</p>
                    <p className={styles.precio}>S/{product.price}</p>
                    <p className={styles.descripcion}>{product.compatibility}</p>
                    
                    {title==="productCustomer" ?
                    <h3 className={styles.h3}>Cantidad</h3> :
                    <h3 className={styles.h3}>Beneficios</h3> }

                    {title==="productCustomer" ?
                    <div className={styles.stock}>
                        <button className={styles.button} onClick={decrementStock}>-</button>
                        <input className={styles.input} type='text' value={stock} readOnly/>
                        <button className={styles.button} onClick={incrementStock}>+</button>
                    </div>
                    :
                    <div className={styles.beneficios}>
                        <ul className={styles.ul}>
                            {product.benefits.map((obj,index) => (
                                <li key={index} className={styles.li}>{obj}</li>
                            ))}
                        </ul>
                    </div>
                    }

                    <hr className={styles.hr}/>
                    <div className={styles.info}>
                        <section className={styles.sectionInfo}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <p>Envío gratis en compras mayores a S/50</p>
                        </section>
                        <section className={styles.sectionInfo}>
                            <i className="fa-solid fa-plus"></i>
                            <p>30 días para cambios y devoluciones</p>
                        </section>
                        <section className={styles.sectionInfo}>
                            <i className="fa-solid fa-shield"></i>
                            <p>Garantía de autenticidad</p>
                        </section>
                    </div>
                    <hr/>
                    {title==="productCustomer" &&
                    <div className={styles.wrapperBtn}>
                        <button 
                            className={`${styles.button} ${isAdding ? styles.adding : ''}`} 
                            disabled={isAdding}
                        >
                            <FaShoppingCart /> {isAdding ? 'Añadiendo...' : 'Añadir al Carrito'}
                        </button>
                        <button 
                            className={styles.button}
                        >
                            <FaWhatsapp /> Comprar por WhatsApp
                        </button>
                    </div>
                    }
                    {title!=="productCustomer" && 
                    <div className={styles.wrapperBtn}>
                        <button 
                            className={styles.button}
                        >
                            <FaWhatsapp /> Reservar por WhatsApp
                        </button>
                    </div>
                    }
                </section>
            </div>
            }
        </Modal>
    );
}

export default ModalProductsAdmin
