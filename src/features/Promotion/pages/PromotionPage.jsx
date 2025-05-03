import { usePromotions } from "../hooks/usePromotion";
import { PromotionsGrid } from "../components/PromotionGrid/PromotionGrid"
import styles from "../styles/PromotionsPage.module.css";

export const PromotionsPage = () => {
  const { promotions, loading, error } = usePromotions();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Promociones Especiales</h1>
      <PromotionsGrid 
        promotions={promotions} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default PromotionsPage;