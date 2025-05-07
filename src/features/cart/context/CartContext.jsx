import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('naviCart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando se actualice
  useEffect(() => {
    localStorage.setItem('naviCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Si ya existe, incrementar la cantidad
        toast.success(`${product.name} añadido al carrito`, {
          icon: "🛒"
        });
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agregar nuevo producto con cantidad 1
        toast.success(`${product.name} añadido al carrito`, {
          icon: "🛒"
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remover un producto del carrito
  const removeFromCart = (productId) => {
    // Obtener el nombre del producto antes de eliminarlo
    const productToRemove = cartItems.find(item => item.id === productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));

    if (productToRemove) {
      toast.info(`${productToRemove.name} eliminado del carrito`, {
        icon: "🗑️"
      });
    }
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    toast.info('Carrito vaciado', {
      icon: "🧹"
    });
  };

  // Calcular el total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + ( (item.price-(item.price*(item.discount/100))) * item.quantity), 0);
  };

  // Obtener número total de items en el carrito
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Abrir/cerrar carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    toggleCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};