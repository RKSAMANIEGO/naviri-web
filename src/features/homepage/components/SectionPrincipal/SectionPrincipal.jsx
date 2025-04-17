import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import logo from "../../../../assets/image/logo-navi.png";
import model1 from "../../../../assets/models/model1.png";
import { getPromotions } from "../../../../services/promotionService";

const SectionPrincipal = () => {
    const [promotions, setPromotions] = useState([])
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    useEffect(() => {
      const fetchData = async () => {
        const response = await getPromotions();
        if (response && response.data.length > 0) {
          setPromotions(response.data);
        } else {
          console.error("No promotions found");
        }
      }
        fetchData();
    }, [])
    
    return (
        <div className="relative w-full h-[95vh] overflow-hidden">
            <Swiper
                autoplay={{ delay: 5000 }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                pagination={{
                    clickable: true,
                    bulletActiveClass: 'swiper-pagination-bullet-active bg-pink-500'
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                modules={[Navigation, Autoplay, Pagination]}
                className="w-full h-full"
            >
                {promotions && promotions.map((promotion, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {/* Fondo con imagen y opacidad */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={promotion.image.url || model1}
                                    alt="Background"
                                    className="w-full h-full object-cover object-center opacity-70"
                                />
                                <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
                            </div>
                            
                            {/* Contenido centrado */}
                            <div className="relative z-10 h-full flex items-center justify-center">
                                <div className="w-full max-w-4xl flex flex-col items-center text-center px-6 py-8">
                                    <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center p-2 mb-8">
                                        <img src={logo} alt="Navi Logo" className="w-18 h-18" />
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-6 [text-shadow:_2px_2px_6px_rgb(0_0_0_/_70%)] leading-tight">
                                        {promotion.title}
                                    </h1>
                                    <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mb-8 [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)] leading-relaxed">
                                        {promotion.description}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                        <a href="/products" className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-[10px] text-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                                            Ver Promoción
                                        </a>
                                        <a href="#aboutus" className="bg-white/90 hover:bg-white text-pink-600 px-10 py-4 rounded-[10px] text-xl font-medium transition-all shadow-md hover:shadow-lg border border-pink-300 transform hover:-translate-y-1">
                                            Conócenos
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Controles de navegación - Visibles solo en desktop */}
            <div
                ref={navigationPrevRef}
                className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/40 hover:bg-white p-4 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div
                ref={navigationNextRef}
                className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/40 hover:bg-white p-4 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>

            {/* Estilos personalizados para los bullets de paginación */}
            <style jsx>{`
                :global(.swiper-pagination) {
                    position: absolute;
                    bottom: 20px !important;
                    z-index: 30;
                }
                :global(.swiper-pagination-bullet) {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.7);
                    opacity: 0.7;
                    margin: 0 6px;
                }
                :global(.swiper-pagination-bullet-active) {
                    background: #ec4899 !important;
                    opacity: 1;
                    width: 14px;
                    height: 14px;
                }
            `}</style>
        </div>
    );
};

export default SectionPrincipal;