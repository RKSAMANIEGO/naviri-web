import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, ArrowRightCircle, Youtube } from "lucide-react";
import styles from "../../styles/Sectionaboutus.module.css";
import { getAboutUs } from "../../services/aboutUseService";

const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aboutData, setAboutData] = useState(null);
  const [animation, setAnimation] = useState('fadeIn');
  const [isAnimating, setIsAnimating] = useState(false);

const handleSlideChange = (direction) => {
  if (isAnimating) return;
  
  setIsAnimating(true);
  setAnimation('fadeOut');
  
  setTimeout(() => {
    direction === 'next' ? nextSlide() : prevSlide();
    setAnimation('fadeIn');
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, 300);
};


  const carouselItems = aboutData ? [
    {
      id: 1,
      title: "Nuestra Misión",
      content: aboutData.mission,
      icon: <Heart size={35} color="#ff6bbc" />
    },
    {
      id: 2,
      title: "Nuestra Visión",
      content: aboutData.vision,
      icon: <ArrowRightCircle size={35} color="#ff6bbc" />
    },
    {
      id: 3,
      title: "Canal de YouTube",
      content: aboutData.name_yt,
      url: aboutData.url_yt,
      icon: <Youtube size={35} color="#ff6bbc" />
    }
  ] : [];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAboutUs();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const nextSlide = () => {
    if (carouselItems.length > 0) {
      setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (carouselItems.length > 0) {
      setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
    }
  };

  if (!aboutData) return <div className={styles.loading}>Cargando...</div>;

  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <h1 className={styles.mainTitle}>NUESTROS VALORES</h1>
        
        <div className={styles.contentWrapper}>
          {aboutData.images?.url && (
            <div className={styles.imageColumn}>
              <img 
                src={aboutData.images.url} 
                alt="Sobre nosotros" 
                className={styles.image}
              />
            </div>
          )}
          
          <div className={styles.carouselColumn}>
            {carouselItems.length > 0 && (
              <div className={styles.carousel}>
                <button 
                  onClick={() => handleSlideChange('prev')} 
                  className={styles.carouselButton}
                  disabled={isAnimating}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className={`${styles.carouselContent} ${styles[animation]}`}>
                  <div className={styles.carouselIcon}>
                    {carouselItems[currentSlide].icon}
                  </div>
                  <h3>{carouselItems[currentSlide].title}</h3>
                  {carouselItems[currentSlide].url ? (
                    <a 
                      href={carouselItems[currentSlide].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.youtubeLink}
                    >
                      {carouselItems[currentSlide].content}
                    </a>
                  ) : (
                    <p>{carouselItems[currentSlide].content}</p>
                  )}
                </div>
                
                <button 
                  onClick={() => handleSlideChange('next')} 
                  className={styles.carouselButton}
                  disabled={isAnimating}
                >
                  <ChevronRight size={24} />
                </button>
                
                <div className={styles.carouselIndicators}>
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${currentSlide === index ? styles.active : ""}`}
                      onClick={() => {
                        if (currentSlide !== index) {
                          handleSlideChange(index > currentSlide ? 'next' : 'prev');
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;