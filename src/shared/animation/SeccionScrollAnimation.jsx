import React, { useEffect, useRef, useState } from 'react'
import { motion as Scroll } from 'framer-motion';
const SeccionScrollAnimation = ({children}) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
            // Si el componente entra en la vista, activamos la animación
            console.log('Intersección detectada:', entry.isIntersecting);
            if (entry.isIntersecting) {
            
                setInView(true);
            }
            },
          { threshold: 0.1 } // Cuando el 20% del componente es visible, lo consideramos en vista
        );
    
        // Comenzamos a observar el componente
        if (ref.current) observer.observe(ref.current);
    
        // Limpiamos el observador cuando el componente se desmonte
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
        }, []);
    return (
        <Scroll.div
        ref={ref}
        initial={{ x: '100%' }} // Comienza fuera de la pantalla por la derecha
        animate={{ x: inView ? 0 : '100%' }} // Se mueve a la posición original cuando entra en la vista
        exit={{ x: '100%' }} // Sale por la derecha cuando cambia
        transition={{ type: 'spring', stiffness: 50 }}
        style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginTop: '20px',
            height: '300px', // Asegúrate de que el componente tiene suficiente altura para hacer scroll
            backgroundColor: 'lightblue', // Para ayudar a ver el componente
        }}
        >
            {children}
        </Scroll.div>
    )
}

export default SeccionScrollAnimation
