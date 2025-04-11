import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/image/logo-navi.png";
import model1 from "../../assets/models/model1.png";
import { getPromotions } from "../../services/promotionService";

const Carousel = () => {
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
        <div className="relative w-full h-[600px] lg:h-[600px] overflow-hidden">
            <Swiper
                autoplay={{ delay: 5000 }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                modules={[Navigation, Autoplay]}
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
                                    className="w-full h-full object-cover object-center lg:object-right opacity-70"
                                />
                                <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                            </div>
                            
                            {/* Contenido superpuesto - Ajustado a la izquierda */}
                            <div className="relative z-10 h-full flex items-center px-4 lg:px-8">
                                <div className="w-full lg:w-[70%] flex flex-col items-start text-left pl-6 lg:pl-20 pr-4 max-w-3xl py-8">
                                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center p-2 mb-6">
                                        <img src={logo} alt="Navi Logo" className="w-14 h-14" />
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-bold text-gray-100 mb-4 [text-shadow:_1px_1px_4px_rgb(0_0_0_/_50%)] leading-tight">
                                        {promotion.title}
                                    </h1>
                                    <p className="text-base sm:text-lg text-gray-200 max-w-xl mb-6 [text-shadow:_1px_1px_3px_rgb(0_0_0_/_40%)] leading-relaxed">
                                        {promotion.description}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a href="/products" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-[8px] text-lg font-medium transition-all shadow-md hover:shadow-lg">
                                            Ver Promoción
                                        </a>
                                        <a href="#aboutus" className="bg-white/90 hover:bg-white text-pink-600 px-8 py-3 rounded-[8px] text-lg font-medium transition-all shadow-md hover:shadow-lg border border-pink-300">
                                            Conócenos
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Controles de navegación */}
            <div
                ref={navigationPrevRef}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/40 hover:bg-white p-3 md:p-4 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div
                ref={navigationNextRef}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/40 hover:bg-white p-3 md:p-4 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
};

export default Carousel;