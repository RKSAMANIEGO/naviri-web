import { useEffect, useRef } from 'react';
import styles from '../../styles/producto.module.css'
import ScrollReveal from "scrollreveal";
const TitleNewProducts = () => {
    
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
                origin: 'left',
                delay: 300,
            });
        }

        return () =>(sr.current) && sr.current.clean(subTitleRef.current);
    
    }, []);
    return (
        <section className={styles.title} ref={subTitleRef}>
            <h3>Ultimas Novedades</h3>
            <p>¡Hoy llegó lo nuevo! Belleza natural que transforma tu piel desde el primer toque.</p>
        </section>
    )
}

export default TitleNewProducts
            