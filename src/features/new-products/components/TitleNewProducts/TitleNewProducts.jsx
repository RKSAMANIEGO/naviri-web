import { motion } from 'framer-motion';

const TitleNewProducts = () => {
    const variants = {
        hidden: { opacity: 0, x: -50 }, 
        visible: (i = 0) => ({
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: i * 0.2,
            },
        }),
    };

    return (
        <section className="py-8 md:py-12 text-center"> 
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h3
                    className="text-3xl sm:text-4xl font-semibold text-[#fb64b6] mb-3" 
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    custom={0} 
                >
                    Últimas Novedades
                </motion.h3>
                <motion.p
                    className="text-md sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    custom={1} // Segundo elemento en animar
                >
                    ¡Hoy llegó lo nuevo! Belleza natural que transforma tu piel desde el primer toque.
                </motion.p>
            </div>
        </section>
    );
};

export default TitleNewProducts;