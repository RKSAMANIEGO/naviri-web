import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getServices } from "../../../../core/services/secServices";
import styles from "./SectionServices.module.css";
import ScrollReveal from 'scrollreveal';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SectionServices = () => {
    const [services, setServices] = useState([]);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const sr = useRef(null);

    useEffect(() => {
        sr.current = ScrollReveal({
            reset: false, 
            distance: '40px',
            duration: 1000,
            easing: 'ease-out',
            viewFactor: 0.2
        });

        if (titleRef.current) {
            sr.current.reveal(titleRef.current, {
                origin: 'left',
                delay: 300,
            });
        }

        const fetchData = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
                setTimeout(() => {
                    if (sectionRef.current) {
                        sr.current.reveal(sectionRef.current, {
                            origin: 'bottom',
                            delay: 300,
                            beforeReveal: (el) => {
                                el.style.opacity = 1; 
                            }
                        });
                    }
                }, 500);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        
        fetchData();

        return () => {
            if (sr.current) {
                sr.current.destroy();
            }
        };
    }, []);


    return (
        <div className={styles.container} ref={sectionRef}>
            <div ref={titleRef}>
                <h1>Servicios especiales</h1>
                <p>Ofrecemos una variedad de servicios para satisfacer tus necesidades.</p>
            </div>
            
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                /*autoplay={{ delay: 10000}}*/
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    }
                }}
                className={styles.swiperContainer}
                
            >
                {services.map(service => (
                    <SwiperSlide key={service.id} className={styles.swiperSlide}>
                        <div className={styles.servicecard}>
                            {service.image && (
                                <div className={styles.imgContainer}>
                                    <img src={service.image.url} alt={service.title} />
                                </div>
                            )}
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul>
                                {service.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SectionServices;