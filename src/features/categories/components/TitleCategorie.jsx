import { useEffect, useRef, useState } from 'react';
import styles from '../styles/producto.module.css';
import ScrollReveal from "scrollreveal";

const TitleCategorie = () => {

        const sr = useRef(null);
        const featuresRef = useRef(null);
        const [titleCat, setTitle] = useState(localStorage.getItem("nameCategorie") || "");
    
        useEffect(() => {
            const handleStorageChange = () => {
                setTitle(localStorage.getItem("nameCategorie"));
            };
            // Escuchamos cambios en localStorage
            window.addEventListener("storage", handleStorageChange);

            // También por seguridad cuando cambia el componente
            handleStorageChange();
    
            return () => {
                window.removeEventListener("storage", handleStorageChange);
                localStorage.clear();
            };
        }, []);
    
        useEffect(() => {
            const handleCustomChange = () => {
                setTitle(localStorage.getItem("nameCategorie"));
            };
        
            window.addEventListener("localStorageUpdated", handleCustomChange);
        
            return () => {
                window.removeEventListener("localStorageUpdated", handleCustomChange);
                localStorage.clear();
            };
        }, []);
        

        //Animación
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
    
    
        //const titleCat = localStorage.getItem("nameCategorie");
    return (
        <section className={styles.title}>
                {!titleCat || titleCat.trim() === '' 
                    ? <h3 ref={featuresRef}>Belleza Esencial</h3> 
                    : <h3 ref={featuresRef}>{titleCat.toUpperCase()}</h3>}
        </section>
    )
}

export default TitleCategorie
