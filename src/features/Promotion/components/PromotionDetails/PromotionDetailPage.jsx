import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listProducts } from "../../services/adminProductsApi";
import { LoadingOutlined} from '@ant-design/icons';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import styles from "../../styles/PromotionDetailPage.module.css";
import { useCart } from '../../../cart/context/CartContext';
import {lanzarConfetti} from '../../../../shared/animation/Confetti/confetti';

const PromotionDetailPage = () => {
  const { name } = useParams();
  const [promotion, setPromotion] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadPromotion = async () => {
      try {
        const resp = await listProducts();
        const all = resp?.data?.data || [];
        const found = all.find(promo => String(promo.name) === name);
        console.log("Promoción encontrada:", found);
  
        if (found) setPromotion(found);
        else console.warn("Promoción no encontrada con ID:", name);
      } catch (err) {
        console.error(err);
      }
    };
  
    loadPromotion();
  }, [id]);

  const handleAddToCart = () => {
    if (promotion) {
      addToCart(promotion);
      lanzarConfetti();
    } 
  };



  const handleWhatsapp = () => {
    if (!promotion) return;
  
    const price = parseFloat(promotion.price);
    const discount = parseFloat(promotion.discount);
    const discountedPrice = (price * (1 - discount / 100)).toFixed(2);
  
    const msg = `¡Hola! Me interesa la promoción ${promotion.name} en S/${discountedPrice}. ¿Más info?`;
    window.open(`https://wa.me/+51927987259?text=${encodeURIComponent(msg)}`, '_blank');
  };
  
  

  if (!promotion) {
    return (
      <div className={styles.loading}>
        <LoadingOutlined style={{ fontSize: '48px' }} />
        <p>Cargando promoción...</p>
      </div>
    );
  }

  const discountedPrice = Number(promotion.price * (1 - promotion.discount / 100)).toFixed(2);

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={promotion.image?.url} alt={promotion.name} className={styles.image} />
        {promotion.discount > 0 && (
          <span className={styles.discountBadge}>-{promotion.discount}%</span>
        )}
      </div>

      <div className={styles.infoSection}>
        <h1 className={styles.title}>{promotion.name}</h1>
        <p className={styles.compatibility}>{promotion.compatibility}</p>

        <div className={styles.benefits}>
          <h2>Beneficios</h2>
          <ul>
            {promotion.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div className={styles.pricing}>
          <span className={styles.currentPrice}>S/ {discountedPrice}</span>
          <span className={styles.originalPrice}>S/ {Number(promotion.price).toFixed(2)}</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.addBtn} onClick={handleAddToCart}>
            <FaShoppingCart /> Añadir al carrito
          </button>
          <button className={styles.whatsappBtn} onClick={handleWhatsapp}>
            <FaWhatsapp /> Comprar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetailPage;
