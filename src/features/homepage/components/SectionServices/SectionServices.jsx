import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getServices } from "../../../../services/secServices";
import styles from "./SectionServices.module.css";

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SectionServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Servicios especiales</h1>
            <p>Ofrecemos una variedad de servicios para satisfacer tus necesidades.</p>
            
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
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