import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SeccionScrollAnimation = ({ children ,direction }) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !inView) {
            setInView(true);
            }
        },
        { threshold: 0.01 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
        observer.disconnect();
    };
    }, [inView]);

    let dir= "0";
    (direction === "left") ? dir="-100%" : dir="100%";


    return (
        <motion.div
        ref={ref}
        style={{
        position: inView ? 'relative' : 'absolute',
        left: inView ? '0' : dir,
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
      }}
        initial={{ x: '100%' }}
        animate={{ x: inView ? 0 : dir || '-100%' }}
        transition={{ type: 'spring', stiffness: 30, damping: 14 }}
        >
            {children}
        </motion.div>
    );
};

export default SeccionScrollAnimation;
