import { Leaf, Truck, CheckCircle, Handshake, Star, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/SectionCategorias.module.css";

const SectionCategorias = () => {
    const navigate = useNavigate();
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
        <section className={styles.categoriesSection} aria-label="Categorías de productos">
            <header className={styles.headerIcons} aria-label="Beneficios">
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

                <div className={styles.sectioncategories}>
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