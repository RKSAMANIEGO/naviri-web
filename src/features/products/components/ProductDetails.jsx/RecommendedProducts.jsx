import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listProducts } from '../../services/productsApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const RecommendedProducts = ({ currentProductId }) => {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommended = async () => {
            try {
                console.log("Fetching recommendations, excluding ID:", currentProductId);
                const response = await listProducts(1, 20);

                if (response?.data?.data) {
                    console.log("API returned products:", response.data.data.length);

                    // Less strict filtering in case ID formats don't match exactly
                    const processedProducts = response.data.data
                        .map(product => ({
                            ...product,
                            price: Number(product.price) || 0,
                            discount: Number(product.discount) || 0,
                            name: product.name.trim()
                        }))
                        .filter(product => {
                            // More robust ID comparison
                            const isCurrentProduct =
                                product._id === currentProductId ||
                                product.id === currentProductId;

                            const hasValidPrice = !isNaN(product.price);

                            return !isCurrentProduct && hasValidPrice;
                        })
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 4);

                    console.log("Filtered recommended products:", processedProducts.length);
                    setRecommended(processedProducts);
                } else {
                    console.log("No product data in response");
                }
            } catch (error) {
                console.error("Error al cargar recomendados:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentProductId) {
            fetchRecommended();
        } else {
            setLoading(false);
            console.warn("No currentProductId provided to RecommendedProducts");
        }
    }, [currentProductId]);

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
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Productos recomendados</h2>
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 }
                }}
                className="mySwiper"
            >
                {recommended.map((product, index) => (
                    <SwiperSlide key={`product-${product._id || product.id || index}`}>
                        <ProductCard
                            product={product}
                            scrollContentProduct={scrollContentProduct}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

// Componente de tarjeta de producto reutilizable
const ProductCard = ({ product, scrollContentProduct }) => {
    const finalPrice = product.price * (1 - (product.discount / 100));

    return (
        <div className="group rounded-sm pb-10 sm:rounded-2xl overflow-hidden md:hover:shadow-md md:shadow-pink-400 transition-shadow duration-300 h-full flex flex-col">
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
                <p className='text-center text-[10px] sm:text-[13px] capitalize mb-1'>
                    {product.categories && product.categories.map ? 
                        product.categories.map(cat => cat.name.toLowerCase()).join(', ') : 
                        'Categoría'}
                </p>
                <h4 className="font-bold truncate text-center text-[12px] sm:text-[15px] text-black uppercase mb-2">
                    {product.name}
                </h4>
                <div className="flex justify-center items-center gap-3 mt-auto">
                    {product.discount > 0 && (
                        <span className="text-gray-500 text-[11px] sm:text-[14px] line-through">
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