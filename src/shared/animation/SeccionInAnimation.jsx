import React from 'react'
import {motion as Title} from 'framer-motion';

const SeccionInAnimation = ({title}) => {
    return (
    <Title.div
        initial={{ x: '100%' }} // Comienza fuera de la pantalla por la derecha
        animate={{ x: 0 }}       // Se mueve a su posición original
        exit={{ x: '100%' }}     // Sale por la derecha cuando cambia
        transition={{ type: 'spring', stiffness: 50 }} // Controla la animación
        style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '20px' }}
    >
        {title}
    </Title.div>
    )
}

export default SeccionInAnimation
