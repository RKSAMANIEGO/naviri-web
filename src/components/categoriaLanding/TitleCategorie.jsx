import { useEffect, useState } from 'react';
import styles from '../../styles/producto.module.css'
const TitleCategorie = () => {
    
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
        
    
    
        //const titleCat = localStorage.getItem("nameCategorie");
    return (
        <section className={styles.title}>
                {!titleCat || titleCat.trim() === '' 
                    ? <h3>Belleza Esencial</h3> 
                    : <h3>{titleCat.toUpperCase()}</h3>}
        </section>
    )
}

export default TitleCategorie
