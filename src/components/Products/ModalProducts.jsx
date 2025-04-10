import Modal from 'react-modal'
import styles from '../../styles/producto.module.css'
import { useEffect, useState } from 'react'

Modal.setAppElement("#root")
    
const ModalProducts = ({isOpen,onClose,product,title}) => {

    const[stock,setStock]=useState(0);

    useEffect(()=>{
        setStock(0);
    },[product])

    const decrementStock=()=>{
        if(stock>0){
            setStock(stock-1);
        }
    }
    const incrementStock=()=>{
        setStock(stock+1);
    }
    return (
            <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    background:"rgb(0,0,0,0.5)",
                    zIndex: 100
                },
                content:{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width:"750px",
                    height:"400px",
                    padding:"0",
                    border:"none"
                }
            }}
            >
            {(product && isOpen) &&
            <div className={styles.modalProducts}>
                <section className={styles.section} style={
                    {
                        backgroundImage: `url(${product.image.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
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
                        <button className={styles.button}  onClick={incrementStock}>+</button>
                    </div>
                    :
                    <div className={styles.beneficios}>
                        <ul className={styles.ul}>
                            {product.benefits.map((obj,index)=>(
                                <li key={index} className={styles.li}>{obj}</li>
                            ))}
                        </ul>
                    </div>
                    }

                    <hr className={styles.hr}/>
                    <div className={styles.info}>
                        <section className={styles.sectionInfo}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <p>Envio gratis en comprar mayores a S/50</p>
                        </section>
                        <section  className={styles.sectionInfo}>
                            <i className="fa-solid fa-plus"></i>
                            <p>30 dias para cambios  y devoluciones</p>
                        </section>
                        <section  className={styles.sectionInfo}>
                            <i className="fa-solid fa-shield"></i>
                            <p>Garantia de autenticidad</p>
                        </section>
                    </div>
                    <hr/>
                    {title==="productCustomer" &&
                    <div className={styles.wrapperBtn}>
                        <button className={styles.button}><i className="fa-solid fa-cart-shopping"></i> Añadir al Carrito</button>
                        <button className={styles.button}>Comprar por WhatsApp</button>
                    </div>
                    }
                </section>
            </div>
            }
            </Modal>


    )
}
export default ModalProducts
