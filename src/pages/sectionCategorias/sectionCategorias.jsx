import {Leaf, Truck, CheckCircle, Handshake, Star} from "lucide-react";
import styles from "../../styles/SectionCategorias.module.css";

const SectionCategorias = () => {
    return(
    <section className={styles.categoriesSection}>
      <div className={styles.headerIcons}>
        <div className={styles.icons}>
        <div className={styles.iconCircle}>
            <Leaf size={25} color="#ff6bbc"/>
        </div>
            <p>Productos Naturales</p>
        </div>

        <div className={styles.icons}>
        <div className={styles.iconCircle}>
            <Truck size={25} color="#ff6bbc"/>
        </div>
            <p>Envió gratis</p>
        </div>

        <div className={styles.icons}>
        <div className={styles.iconCircle}>
            <CheckCircle size={25} color="#ff6bbc"/>
        </div>
            <p>Garantía de calidad</p>
        </div>

        <div className={styles.icons}>
        <div className={styles.iconCircle}>
            <Handshake size={25} color="#ff6bbc"/>
        </div>
            <p>Atención Personalizada</p>
        </div>
      </div>

      <div className={styles.categoriestitle}>
        <h2>Categorías de Productos</h2>
        <p>Descubre nuestra amplia gama de produtos de belleza diseñados para realizar
            tu belleza natural 
        </p>

       <div className={styles.sectioncategories}>
       {[
          { title: "Cuidado Facial", items: ["Limpiadores", "Sérums", "Mascarillas"] },
          { title: "Maquillaje", items: ["Bases y correctores", "Labiales y brillos", "Sombras y delineadores"] },
          { title: "Cuidado Capilar", items: ["Champús y acondicionadores", "Mascarillas capilares", "Aceites y sérums"] },
        ].map((category, index) => (

        <div key={index} className={styles.card}>
             <div className={styles.iconCirclestar}>
                <Star size={25} color="#ff6bbc" className={styles.cardIconstar} />
             </div>
                <h3>{category.title}</h3>
                <p>Productos para mantener tu piel radiante y saludable.</p>
             <ul>
              {category.items.map((item, i) => (
                <li key={i}>✔️ {item}</li>
               ))}
            </ul>
            <button className={styles.buttoncard} href="#">Ver productos</button>
        </div>
          
        ))}
        

       </div>

      </div>

    </section>
    );
};

export default SectionCategorias;