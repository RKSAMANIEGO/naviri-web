import { useEffect, useRef } from "react";
import { Leaf, Truck, CheckCircle, Handshake, Star, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./SectionCategorias.module.css";
import ScrollReveal from "scrollreveal";

const SectionCategorias = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const featuresRef = useRef(null);
    const categoriesRef = useRef(null);
    const sr = useRef(null);

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

            const featureItems = featuresRef.current.querySelectorAll(`.${styles.icons}`);
            featureItems.forEach((item, index) => {
                sr.current.reveal(item, {
                    origin: 'bottom',
                    delay: 300 + (index * 100),
                });
            });
        }

        sr.current.reveal(`.${styles.categoriestitle} h2`, {
            origin: 'left',
            delay: 300,
        });

        sr.current.reveal(`.${styles.categoriestitle} p`, {
            origin: 'left',
            delay: 400,
        });

        if (categoriesRef.current) {
            const cards = categoriesRef.current.querySelectorAll(`.${styles.card}`);
            cards.forEach((card, index) => {
                sr.current.reveal(card, {
                    origin: 'bottom',
                    delay: 400 + (index * 150),
                });
            });
        }

        return () => {
            if (sr.current) {
                sr.current.clean(featuresRef.current);
                sr.current.clean(categoriesRef.current);
                sr.current.clean(`.${styles.categoriestitle} h2`);
                sr.current.clean(`.${styles.categoriestitle} p`);
            }
        };
    }, []);

    const features = [
        { icon: <Leaf size={25} color="#ff6bbc" />, text: "Productos Naturales" },
        { icon: <Truck size={25} color="#ff6bbc" />, text: "Envío gratis" },
        { icon: <CheckCircle size={25} color="#ff6bbc" />, text: "Garantía de calidad" },
        { icon: <Handshake size={25} color="#ff6bbc" />, text: "Atención Personalizada" }
    ];

    const categories = [
        {
            title: "Cuidado Facial",
            items: ["Limpiadores", "Sérums", "Mascarillas"],
            description: "Productos especializados para el cuidado y protección de tu rostro."
        },
        {
            title: "Maquillaje",
            items: ["Bases y correctores", "Labiales y brillos", "Sombras y delineadores"],
            description: "Cosméticos de alta calidad para realzar tu belleza natural."
        },
        {
            title: "Cuidado Capilar",
            items: ["Acondicionadores", "Mascarillas capilares", "Aceites y sérums"],
            description: "Solución completa para un cabello saludable y brillante."
        }
    ];

    return (
        <section className={styles.categoriesSection} aria-label="Categorías de productos" ref={sectionRef}>
            <header className={styles.headerIcons} aria-label="Beneficios" ref={featuresRef}>
                {features.map((feature, index) => (
                    <article key={index} className={styles.icons} aria-label={feature.text}>
                        <div className={styles.iconCircle}>
                            {feature.icon}
                        </div>
                        <p>{feature.text}</p>
                    </article>
                ))}
            </header>

            <div className={styles.categoriestitle}>
                <h2>Categorías de Productos</h2>
                <p>Descubre nuestra amplia gama de productos de belleza diseñados para realzar tu belleza natural</p>

                <div className={styles.sectioncategories} ref={categoriesRef}>
                    {categories.map((category, index) => (
                        <article key={index} className={styles.card}>
                            <div className={styles.iconCirclestar}>
                                <Star size={25} color="#ff6bbc" className={styles.cardIconstar} />
                            </div>
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                            <ul>
                                {category.items.map((item, i) => (
                                    <li key={i}>
                                        <Check color="#ff6bbc" aria-hidden="true" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={styles.buttoncard}
                                aria-label={`Ver productos de ${category.title}`}
                                onClick={() => {
                                    navigate('/products');
                                    window.scrollTo(0, 0);
                                }}
                            >
                                Ver productos
                            </button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionCategorias;