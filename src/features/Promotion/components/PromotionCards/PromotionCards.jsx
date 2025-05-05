import { useNavigate } from "react-router-dom";
import styles from "../../styles/PromotionCard.module.css";


export const PromotionCards = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.name}`);
    console.log("Producto clickeado:", product);

  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer} onClick={handleClick}>
        <img
          src={product.image?.url || "/placeholder.svg"}
          alt={product.name}
          className={styles.image}
        />
        <span className={styles.discountBadge}>-{product.discount}%</span>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.name} onClick={handleClick}>{product.name}</h3>
        
        <div className={styles.pricing}>
          <span className={styles.currentPrice}>
            S/{Number(product.price - (product.price * (product.discount / 100))).toFixed(2)}
          </span>
          <span className={styles.originalPrice}>
            S/{Number(product.price).toFixed(2)}
          </span>
        </div>
        
        <p className={styles.savings}>
          Ahorras S/{Number(product.price * (product.discount / 100)).toFixed(2)}
        </p>
      </div>
    </div>
  );
};