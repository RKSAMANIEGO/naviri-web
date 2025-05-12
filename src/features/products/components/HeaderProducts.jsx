import { useEffect, useRef } from 'react';
import styles from './producto.module.css' 
import ScrollReveal from "scrollreveal";
const HeaderProducts = () => {
    //Animación
    const sr = useRef(null);
    const titleRef = useRef(null);
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

        if (titleRef.current) {
            sr.current.reveal(titleRef.current, {
                origin: 'top',
                delay: 300,
            });
        }
        
        if (subTitleRef.current) {
            sr.current.reveal(subTitleRef.current, {
                origin: 'right',
                delay: 300,
            });
        }


        return () =>{
            if(sr.current){
                sr.current.clean(titleRef.current);
                sr.current.clean(subTitleRef.current);
            } 
        }

    }, []);
    return (
        <section className={styles.section}>
                <h2 ref={titleRef}>Descubre tu belleza natural</h2>
                <p ref={subTitleRef}>Productos de alta calidad para realizar tu belleza. Encuentra todo lo que necesitas para tu rutina diario.</p>
        </section>
    )
}

export default HeaderProducts