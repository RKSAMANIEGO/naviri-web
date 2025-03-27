import styles from "../../styles/SectionPrincipal.module.css";

const SectionPrincipal = () => {

  return (
    <div className={styles.carrusel}>
        <div className={styles.contenido}>
            <img src="/src/assets/image/logo-navi.png" className={styles.logo}/>
            <h1 className={styles.titulo}>
            ¡Renueva tu Belleza!
            </h1>
            <p className={styles.descripcion}>
                Descubre nuestras promociones especiales en cuidado de la piel
                y maquillaje. ¡Solo por tiempo limitado!
            </p>

            <div className={styles.buttons}>
                <button className={styles.promobutton}>Ver Promoción</button>
                <button className={styles.conocebutton}>Conócenos</button>
            </div>

            </div>
            <img src="/src/assets/image/mujer.png" className={styles.model} alt="Modelo"/>
    </div>
  );

};

export default SectionPrincipal;