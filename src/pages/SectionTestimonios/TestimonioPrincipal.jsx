import { useEffect, useState } from "react";
import styles from "./TestimonioPrincipal.module.css";
import fondoTestimonio from "../../assets/image/testimonio.jpg";
import Stars from './stars.jsx'; 
import { getTestimonios } from "../../services/testimoniosServices.js";
import RotatingText from "./RotatingText.jsx";

export default function Testi() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonios, setTestimonios] = useState([]);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const dataTestimonio = await getTestimonios();
      setTestimonios(dataTestimonio.data || []);
    };
    fetchData();
  }, []);

  // Manejo de cantidad de tarjetas según tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1);
      } else if (window.innerWidth < 992) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // correrlo al cargar

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intervalo de carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        (prev + 1) % Math.ceil(testimonios.length / cardsPerSlide)
      );
    }, 9000);

    return () => clearInterval(interval);
  }, [testimonios, cardsPerSlide]);

  // Actualiza la variable CSS para controlar el slide
  useEffect(() => {
    document.documentElement.style.setProperty('--index', currentIndex);
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const startIndex = currentIndex * cardsPerSlide;
  const currentTestimonios = testimonios.slice(startIndex, startIndex + cardsPerSlide);

  return (
    <section className={styles.testiSection}>
      <div className={styles.container}>
      <h2 className={styles.title}> Lo que dicen <RotatingText texts={["nuestros clientes", "nuestras clientas"]}
      mainClassName={styles.rotatingHighlight} /></h2>
        <div className={styles.carousel}>
          <div className={styles.cardsContainer}>
            {currentTestimonios.map((testimonio) => (
              <div
                key={testimonio.id}
                className={styles.card}
                style={{ backgroundImage: `url(${fondoTestimonio})` }}
              >
                <div className={styles.headerCard}>
                  <img
                    src={testimonio.image.url || "../../assets/image/testiuser.png"}
                    alt={testimonio.name_customer}
                    className={styles.avatar}
                  />
                  <div>
                    <h3 className={styles.nombre}>{testimonio.name_customer}</h3>
                    <Stars rating={testimonio.qualification} />
                  </div>
                </div>

                <div className={styles.mensajeCard}>
                  <p>{testimonio.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.indicadores}>
          {Array.from({ length: Math.ceil(testimonios.length / cardsPerSlide) }).map(
            (_, index) => (
              <button
                key={index}
                className={`${styles.indicador} ${currentIndex === index ? styles.indicadorActivo : ""}`}
                onClick={() => goToSlide(index)}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
