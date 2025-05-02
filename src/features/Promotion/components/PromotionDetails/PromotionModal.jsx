import React from 'react';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import ProductDescription from '../PromotionDetails/ProductDescription';
import styles from '../../styles/PromotionModal.module.css';

const PromotionModal = ({ 
  product, 
  onClose, 
  onAddToCart, 
  onWhatsappCheckout 

}) => {
  const benefits = product?.benefits || [];
  
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart && product) {
      onAddToCart(product);  
    }
  };

  const handleWhatsappClick = (e) => {
    e.stopPropagation();
    if (onWhatsappCheckout && product) {
      onWhatsappCheckout(product);
    }
  };
  const currentPrice = product 
    ? (Number(product.price) - (Number(product.price) * (product.discount / 100))).toFixed(2)
    : "0.00";
  const originalPrice = product 
    ? Number(product.price).toFixed(2)
    : "0.00";


  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={handleContainerClick}>
        <div className={styles.content}>
          {/* Imagen del producto */}
          <div className={styles.imageContainer}>
            <img 
              className={styles.image}
              src={product?.image?.url || "/placeholder.svg"} 
              alt={product?.name || "Producto"}
            />
            {product?.discount > 0 && (
              <span className={styles.discountBadge}>
                -{product.discount}%
              </span>
            )}
          </div>
          
          <div className={styles.info}>
            <div className={styles.header}>
              <h1 className={styles.title}>{product?.name || "Producto"}</h1>
              <button 
                onClick={onClose}
                className={styles.closeButton}
              >
                <CloseOutlined />
              </button>
            </div>
             
            <div className={styles.benefitsSection}>
              <h2 className={styles.benefitsTitle}>BENEFICIOS</h2>
              {benefits.length > 0 ? (
                <ul className={styles.benefitsList}>
                  {benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.noBenefits}>No se especificaron beneficios</p>
              )}
            </div>
            
            <p className={styles.availability}>
              <ShoppingCartOutlined className="mr-2" />
              Disponible solo para la ciudad de Lima
            </p>
            
            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>
                S/ {currentPrice}
              </span>
              <span className={styles.originalPrice}>
                S/ {originalPrice}
              </span>
            </div>
            
            <div className={styles.actions}>
              <button
                className={`${styles.actionButton} ${styles.addToCart}`}
                onClick={handleAddToCartClick}
              >
                <FaShoppingCart className={styles.actionIcon} size={24} /> Añadir al carrito
              </button>

              <button
                className={`${styles.actionButton} ${styles.whatsappButton}`}
                onClick={handleWhatsappClick}
              >
                <FaWhatsapp className={styles.actionIcon} size={26} /> Comprar por WhatsApp
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.descriptionSection}>
          <div className={styles.descriptionContent}>
            {product ? (
              <>
                <ProductDescription product={product} />
                {product.description || "Este producto no tiene una descripción detallada."}
              </>
            ) : (
              "Cargando información del producto..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;