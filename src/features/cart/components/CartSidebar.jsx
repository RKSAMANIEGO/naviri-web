import React from 'react';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Updated path
import styles from './CartSidebar.module.css'; // Updated path

const CartSidebar = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    getCartTotal,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();
  

  const handleWhatsappCheckout = () => {
    const total = getCartTotal();
    const message = cartItems.map(item =>
      `• ${item.quantity}x ${item.name} - S/${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const text = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${message}\n\n*Total: S/${total.toFixed(2)}*`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/+51927987259?text=${encodedText}`, '_blank');
  };

  return (
    <div className={`${styles.sidebarOverlay} ${isCartOpen ? styles.open : ''}`} onClick={closeCart}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sidebarHeader}>
          <h2>Tu Carrito</h2>
          <button className={styles.closeButton} onClick={closeCart}>
            <FaTimes />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Ops! Aún No hay Productos</p>
            <button className={styles.continueShopping} onClick={closeCart}>
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.productImage} style={{
                    backgroundImage: `url(${item.image?.url})`
                  }}></div>
                  <div className={styles.productInfo}>
                    <h3>{item.name}</h3>
                    <p className={styles.price}>S/ {item.price}</p>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <FaPlus />
                      </button>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemTotal}>
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span>Total:</span>
                <span>S/ {getCartTotal().toFixed(2)}</span>
              </div>
              <div className={styles.cartActions}>
                <button className={styles.clearButton} onClick={clearCart}>
                  Vaciar Carrito
                </button>
                <button className={styles.checkoutButton} onClick={handleWhatsappCheckout}>
                  <FaWhatsapp /> Comprar por WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;