import { useState } from "react";
import styles from "./TestimonioPrincipal.module.css";
import img from '../assets/image/logo-navi.png'
export default function Testi() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonios = [
    {
      id: 1,
      nombre: "Daniela García",
      imagen: "/placeholder.svg",
      texto:
        "Los productos faciales son increíbles. Mi piel nunca había lucido tan radiante. La calidad es excepcional y los resultados son visibles desde la primera aplicación.",
      estado: "en línea",
    },
    {
      id: 2,
      nombre: "Micaela Rojas",
      imagen: "/placeholder.svg",
      texto:
        "El kit de maquillaje que compré es perfecto. Los colores son preciosos y la duración es notable. Todos me preguntan qué productos uso. ¡Totalmente recomendado!",
      estado: "en línea",
    },
    {
      id: 3,
      nombre: "Nicoll Romero",
      imagen: "/placeholder.svg",
      texto:
        "Los productos para el cabello son de excelente calidad. Mi cabello nunca había estado tan saludable y brillante como ahora. Además, el envío fue muy rápido.",
      estado: "en línea",
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.testiSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Lo que dicen nuestras clientas</h2>
          <p className={styles.subtitle}>Descubre por qué nuestras clientas confían en nuestros productos.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.testimoniosContainer}>
            <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevSlide} aria-label="Testimonio anterior">
              &lt;
            </button>
            <div className={styles.testimoniosWrapper}>
              {testimonios.slice(currentIndex, currentIndex + 2).map((testimonio) => (
                <div key={testimonio.id} className={styles.testimonioCard}>
                  <div className={styles.clienteInfo}>
                    <div className={styles.avatarContainer}>
                      <img src={testimonio.imagen} alt={testimonio.nombre} width={60} height={60} className={styles.avatar} />
                    </div>
                    <div className={styles.clienteDetalles}>
                      <h3 className={styles.clienteNombre}>{testimonio.nombre}</h3>
                      <p className={styles.clienteEstado}>{testimonio.estado}</p>
                    </div>
                  </div>
                  <p className={styles.testimonioTexto}>{testimonio.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.indicadores}>
          {testimonios.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicador} ${currentIndex === index ? styles.indicadorActivo : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
