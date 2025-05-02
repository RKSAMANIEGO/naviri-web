import styles from "../../styles/PromotionGrid.module.css";
import { PromotionCards } from '../PromotionCards/PromotionCards.jsx';

export const PromotionsGrid = ({ promotions, loading, error }) => {
  if (loading) return <div className={styles.loading}>Cargando promociones...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!promotions.length) return <div className={styles.empty}>No hay promociones disponibles</div>;

  return (
    <div className={styles.grid}>
      {promotions.map(product => (
        <PromotionCards key={product.id} product={product} />
      ))}
    </div>
  );
};