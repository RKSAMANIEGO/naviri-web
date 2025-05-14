import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listProducts } from '../../services/productsApi';
import { LoadingOutlined, ScissorOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const RecommendedProducts = ({ currentProductName }) => {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommended = async () => {
            try {
                const response = await listProducts(1, 20);
                if (response?.data?.data) {
                    const processedProducts = response.data.data.map(product => ({
                        ...product,
                        price: Number(product.price) || 0,
                        discount: Number(product.discount) || 0,
                        name: product.name.trim()
                    })).filter(product => 
                        product.name !== currentProductName?.trim() && 
                        !isNaN(product.price)
                    ).sort(() => 0.5 - Math.random())
                    .slice(0, 4);
                    
                    setRecommended(processedProducts);
                }
            } catch (error) {
                console.error("Error al cargar recomendados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommended();
    }, [currentProductName]);

    const scrollContentProduct = () => {
        setTimeout(() => {
            const element = document.getElementById("content");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 800);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <LoadingOutlined className="text-2xl text-pink-500" />
            </div>
        );
    }

    if (recommended.length === 0) {
        return null;
    }

    return (
        <div className="mt-12 px-4 md:px-10">
            <h3 className="text-2xl font-bold text-pink-500 border-dashed w-[95%] sm:w-[99%] border-b-2 border-pink-300 pb-2 mb-6 relative">
                Productos Recomendados
                <span className="absolute -bottom-2 -right-4 text-xs rotate-180"><ScissorOutlined/></span>
            </h3>

            {/* Versión Desktop (grid normal) */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
                {recommended.map(product => (
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                        scrollContentProduct={scrollContentProduct} 
                    />
                ))}
            </div>

            {/* Versión Móvil (slider) */}
            <div className="md:hidden">
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={15}
                    slidesPerView={2}
                    pagination={{ clickable: true }}
                    className="flex flex-col justify-between"
                >
                    {recommended.map(product => (
                        <>                        
                        <SwiperSlide key={product._id} className="">
                            <ProductCard
                                product={product} 
                                scrollContentProduct={scrollContentProduct} 
                            />
                        </SwiperSlide>
                        </>

                    ))}
                </Swiper>
            </div>
        </div>
    );
};

// Componente de tarjeta de producto reutilizable
const ProductCard = ({ product, scrollContentProduct }) => {
    const finalPrice = product.price * (1 - (product.discount / 100));
    
    return (
        <div className="group rounded-sm  pb-10   sm:rounded-2xl overflow-hidden  md:hover:shadow-md md:shadow-pink-400 transition-shadow duration-300 h-full flex flex-col">
            <Link to={`/products/${encodeURIComponent(product.name)}`}>
                <div 
                    className="relative overflow-hidden pt-[100%]"
                    onClick={scrollContentProduct}
                >
                    <img
                        src={product.image[0]?.url || '/placeholder-product.jpg'}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer transition-transform duration-500 ease-in-out group-hover:scale-105"
                        onError={(e) => {
                            e.target.src = '/placeholder-product.jpg';
                        }}
                    />
                    {product.discount > 0 && (
                        <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
                            -{product.discount}%
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-3 flex-grow flex flex-col">
                <p className='text-center  text-[10px] sm:text-[13px] capitalize mb-1'>
                    {product.categories.map(cat => cat.name.toLowerCase()).join(', ')}
                </p>
                <h4 className="font-bold truncate text-center text-[12px] sm:text-[15px] text-black uppercase mb-2">
                    {product.name}
                </h4>
                <div className="flex justify-center items-center gap-3 mt-auto">
                    {product.discount > 0 && (
                        <span className="text-gray-500  text-[11px] sm:text-[14px] line-through">
                            S/ {product.price.toFixed(2)}
                        </span>
                    )}
                    <span className="text-pink-400 font-bold text-[12px] sm:text-[15px]">
                        S/ {finalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RecommendedProducts;