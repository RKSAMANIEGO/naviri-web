import React, { useEffect, useRef } from 'react'
import styles from '../../styles/producto.module.css'
import ScrollReveal from "scrollreveal";
const HeaderNewProducts = () => {
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
                <h2 ref={titleRef}>Nuevos Productos</h2>
                <p ref={subTitleRef}>Lo último en belleza natural, recién salido de la naturaleza para ti...</p>
        </section>
    )
}

export default HeaderNewProducts
