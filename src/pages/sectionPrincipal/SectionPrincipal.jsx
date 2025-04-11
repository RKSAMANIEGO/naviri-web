import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/image/logo-navi.png";
import model1 from "../../assets/models/model1.png";
import model2 from "../../assets/models/model2.png";
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
        <div className="relative w-full h-auto lg:h-[550px] bg-gradient-to-r from-[#FFECFA] to-[#FFAFEB] overflow-hidden"> 
            <Swiper
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                modules={[Navigation]}
                className="w-full h-full"
            >
               
                {promotions ?
                 promotions.map((promotion, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col lg:flex-row w-full h-full justify-center items-center py-10 lg:py-0"> 
                            <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-4 lg:pl-32 lg:pr-16 order-1 lg:order-1"> {/* Changed md to lg */}
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2 mb-6">
                                    <img src={logo} alt="Navi Logo" className="w-14 h-14" />
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-black leading-tight mb-4">{promotion.title}</h1>
                                <p className="text-base sm:text-lg text-gray-800 max-w-lg mb-6">
                                    {promotion.description}
                                </p>
                                <div className="flex gap-4">
                                    <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-[8px] text-lg font-medium transition-all shadow-md hover:shadow-lg">
                                        Ver Promoción
                                    </button>
                                    <button className="bg-white hover:bg-gray-50 text-pink-500 px-6 py-3 rounded-[8px] text-lg font-medium transition-all shadow-md hover:shadow-lg border border-pink-300">
                                        Conócenos
                                    </button>
                                </div>
                            </div>
                            
                            <div className="hidden lg:block lg:w-[55%] h-64 lg:h-full relative order-2 lg:order-2"> 
                                <img
                                    src={promotion.image.url || model1}
                                    alt="Modelo con producto de belleza"
                                    className="h-full w-auto object-contain lg:absolute lg:bottom-0 lg:right-0 lg:max-w-none"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))
                : 
                <>
                
                <SwiperSlide >
                <div className="flex flex-col lg:flex-row w-full h-full justify-center items-center py-10 lg:py-0"> 
                    <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-4 lg:pl-32 lg:pr-16 order-1 lg:order-1"> {/* Changed md to lg */}
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2 mb-6">
                            <img src={logo} alt="Navi Logo" className="w-14 h-14" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-black leading-tight mb-4">¡Renueva tu Belleza con Nosotras!✨</h1>
                        <p className="text-base sm:text-lg text-gray-800 max-w-lg mb-6">
                        Descubre nuestras promociones especiales en cuidado de la piel y maquillaje. ¡Solo por tiempo limitado!
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-[8px] text-lg font-medium transition-all shadow-md hover:shadow-lg">
                                Ver Promoción
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-pink-500 px-6 py-3 rounded-[8px] text-lg font-medium transition-all shadow-md hover:shadow-lg border border-pink-300">
                                Conócenos
                            </button>
                        </div>
                    </div>
                    
                    <div className="hidden lg:block lg:w-[55%] h-64 lg:h-full relative order-2 lg:order-2"> 
                        <img
                            src={model1}
                            alt="Modelo con producto de belleza"
                            className="h-full w-auto object-contain lg:absolute lg:bottom-0 lg:right-0 lg:max-w-none"
                        />
                    </div>
                </div>
                </SwiperSlide>
                <SwiperSlide >
                <div className="flex flex-col lg:flex-row w-full h-full justify-center items-center py-10 lg:py-0"> 
                    <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-4 lg:pl-32 lg:pr-16 order-1 lg:order-1"> {/* Changed md to lg */}
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2 mb-6">
                            <img src={logo} alt="Navi Logo" className="w-14 h-14" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-black leading-tight mb-4">¡Renueva tu Belleza con Nosotras!✨</h1>
                        <p className="text-base sm:text-lg text-gray-800 max-w-lg mb-6">
                        Descubre nuestras promociones especiales en cuidado de la piel y maquillaje. ¡Solo por tiempo limitado!
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-[8px] text-lg font-medium transition-all shadow-md hover:shadow-lg">
                                Ver Promoción
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-pink-500 px-6 py-3 rounded-[8px] text-lg font-medium transition-all shadow-md hover:shadow-lg border border-pink-300">
                                Conócenos
                            </button>
                        </div>
                    </div>
                    
                    <div className="hidden lg:block lg:w-[55%] h-64 lg:h-full relative order-2 lg:order-2"> 
                        <img
                            src={model}
                            alt="Modelo con producto de belleza"
                            className="h-full w-auto object-contain lg:absolute lg:bottom-0 lg:right-0 lg:max-w-none"
                        />
                    </div>
                </div>
                </SwiperSlide>
                </>
            
            }
            </Swiper>

            <div
                ref={navigationPrevRef}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 md:p-3 rounded-full cursor-pointer hover:bg-opacity-100 transition-all shadow-md hover:shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div
                ref={navigationNextRef}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 md:p-3 rounded-full cursor-pointer hover:bg-opacity-100 transition-all shadow-md hover:shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
};

export default Carousel;
