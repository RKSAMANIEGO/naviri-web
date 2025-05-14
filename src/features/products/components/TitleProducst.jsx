import { useEffect, useRef } from 'react';
import styles from './producto.module.css' // Updated path
import ScrollReveal from "scrollreveal";

const TitleProducst = () => {
    const sr = useRef(null);
    const featuresRef = useRef(null);

    useEffect(() => {
        sr.current = ScrollReveal({
            reset: false, 
            distance: '20px',
            duration: 800,
            easing: 'cubic-bezier(0.5, 0, 0, 0.3)',
            viewFactor: 0.2, 
        });

        if (featuresRef.current) {
            sr.current.reveal(featuresRef.current, {
                origin: 'bottom',
                delay: 300,
            });
        }
        return () => (sr.current) && sr.current.clean(featuresRef.current);

    }, []);

    return (
        <section className={styles.title}>
            <h3 ref={featuresRef}>Belleza Esencial</h3>
        </section>
    )
}

export default TitleProducst