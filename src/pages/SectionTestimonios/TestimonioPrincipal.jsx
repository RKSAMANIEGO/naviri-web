import { useEffect, useState } from "react";
import styles from "./TestimonioPrincipal.module.css";
import img from '../../assets/image/logo-navi.png';
import { getTestimonios } from '../../services/testimoniosServices.js';

export default function Testi() {
  const [currentPage, setCurrentPage] = useState(0);
  const [testimonios, setTestimonios] = useState({ data: [] });
  const testimonialsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTestimonio = await getTestimonios();
        setTestimonios(dataTestimonio);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchData();
  }, []);

  const prevSlide = () => {
    if (!testimonios.data || testimonios.data.length === 0) return;
    
    const totalPages = Math.ceil(testimonios.data.length / testimonialsPerPage);
    setCurrentPage((prevPage) => (prevPage === 0 ? totalPages - 1 : prevPage - 1));
  };

  const nextSlide = () => {
    if (!testimonios.data || testimonios.data.length === 0) return;
    
    const totalPages = Math.ceil(testimonios.data.length / testimonialsPerPage);
    setCurrentPage((prevPage) => (prevPage === totalPages - 1 ? 0 : prevPage + 1));
  };

  const goToSlide = (index) => {
    setCurrentPage(index);
  };

  // Calculate which testimonials to show based on current page
  const getCurrentTestimonials = () => {
    if (!testimonios.data || testimonios.data.length === 0) return [];
    
    const startIndex = currentPage * testimonialsPerPage;
    return testimonios.data.slice(startIndex, startIndex + testimonialsPerPage);
  };

  // Calculate total number of pages
  const totalPages = testimonios.data && testimonios.data.length > 0 
    ? Math.ceil(testimonios.data.length / testimonialsPerPage) 
    : 0;

  const currentTestimonials = getCurrentTestimonials();

  return (
    <section className={styles.testiSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Lo que dicen nuestras clientas</h2>
          <p className={styles.subtitle}>Descubre por qué nuestras clientas confían en nuestros productos.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.testimoniosContainer}>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`} 
              onClick={prevSlide} 
              aria-label="Testimonio anterior"
            >
              &lt;
            </button>
            
            <div className={styles.testimoniosWrapper}>
              {currentTestimonials.map((testimonio) => (
                <div key={testimonio.id} className={styles.testimonioCard}>
                  <div className={styles.clienteInfo}>
                    <div className={styles.avatarContainer}>
                      <img 
                        src={testimonio.image_url || '/placeholder.svg'} 
                        alt={testimonio.name_customer} 
                        width={60} 
                        height={60} 
                        className={styles.avatar} 
                      />
                    </div>
                    <div className={styles.clienteDetalles}>
                      <h3 className={styles.clienteNombre}>{testimonio.name_customer}</h3>
                      <p className={styles.clienteEstado}>{testimonio.qualification}</p>
                    </div>
                  </div>
                  <p className={styles.testimonioTexto}>{testimonio.description}</p>
                </div>
              ))}
            </div>
            
            <button 
              className={`${styles.navButton} ${styles.nextButton}`} 
              onClick={nextSlide} 
              aria-label="Testimonio siguiente"
            >
              &gt;
            </button>
          </div>

          <div className={styles.brandPanel}>
            <div className={styles.brandLogo}>
              <img src={img || "/placeholder.svg"} alt="Navi Logo" width={120} height={120} className={styles.logo} />
            </div>
            <p className={styles.brandMessage}>
              En BeautyGlow nos dedicamos a ofrecerte los mejores productos de belleza para que te sientas radiante todos los días.
            </p>
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5K+</span>
                <span className={styles.statLabel}>Clientas satisfechas</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>200+</span>
                <span className={styles.statLabel}>Productos exclusivos</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.indicadores}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`${styles.indicador} ${currentPage === index ? styles.indicadorActivo : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
