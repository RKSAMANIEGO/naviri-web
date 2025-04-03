import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "../../styles/SectionPrincipal.module.css";

const Carousel = () => {
    return (
        <Swiper navigation modules={[Navigation]} className={styles.carousel}>
            <SwiperSlide className={styles.slide}>
                <div className={styles.content}>
                  <div className={styles.logo}>
                      <img src="/src/assets/image/logo-navi.png" alt="Logo" />
                  </div>
                    <h1>¡Renueva tu Belleza! ✨</h1>
                    <p>
                        Descubre nuestras promociones especiales en cuidado de la piel y maquillaje. 
                        ¡Solo por tiempo limitado!
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.primary}>Ver Promoción</button>
                        <button className={styles.secondary}>Conócenos</button>
                    </div>
                </div>
                <div className={styles.image}>
                    <img src="/src/assets/image/mujerof.png" alt="Belleza" />
                </div>
            </SwiperSlide>

            <SwiperSlide className={styles.slide}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                       <img src="/src/assets/image/logo-navi.png" alt="Logo" />
                   </div>
                    <h1>¡Piel perfecta al instante!🌿</h1>
                    <p>Consigue un acabado profesiona con nuestro nuevo Serum iluminador. ¡Oferta exclusiva por lanzamiento</p>
                    <div className={styles.buttons}>
                        <button className={styles.primary}>Comprar ahora</button>
                        <button className={styles.secondary}>Conócenos</button>
                    </div>
                </div>
                <div className={styles.imaged}>
                <img src="/src/assets/image/mujer2.png" alt="Belleza" />
                </div>
            </SwiperSlide>
          
        </Swiper>
    );
};

export default Carousel;
