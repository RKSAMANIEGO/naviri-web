import { usePromotions } from "../hooks/usePromotion";
import { PromotionsGrid } from "../components/PromotionGrid/PromotionGrid"
import styles from "../styles/PromotionsPage.module.css";
import ScrollReveal from "scrollreveal";
import { useEffect, useRef } from "react";

export const PromotionsPage = () => {
  const { promotions, loading, error } = usePromotions();

    //Animación
    const sr = useRef(null);
    const subTitleRef = useRef(null);

      //animation
    useEffect(() => {
        sr.current = ScrollReveal({
            reset: false, 
            distance: '20px',
            duration: 1000,
            easing: 'cubic-bezier(0.5, 0, 0, 0.3)',
            viewFactor: 0.1, 
        });
        
        if (subTitleRef.current) {
            sr.current.reveal(subTitleRef.current, {
                origin: 'top',
                delay: 300,
            });
        }

        return () =>(sr.current) && sr.current.clean(subTitleRef.current);
    
    }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title} ref={subTitleRef}>Promociones Especiales</h1>
      <PromotionsGrid 
        promotions={promotions} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default PromotionsPage;