import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { listProducts } from '../../services/productsApi';
import { LoadingOutlined } from '@ant-design/icons';

const RecommendedProducts = ({ currentProductName }) => {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

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

    /*
    const handleProductClick = (productName) => {
        navigate(`/producto/${encodeURIComponent(productName)}`);
    };*/

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

    const scrollContentProduct = ()=>{
        setTimeout(()=>{
            const element = document.getElementById("content");
            element && element.scrollIntoView({behavior:"smooth"});
        },800)
    }

    return (
        <div className="mt-12 px-4 md:px-10">
            <h3 className="text-2xl font-bold text-pink-500 border-b-2 border-pink-300 pb-2 mb-6 relative">
                Productos Recomendados
                <span className="absolute -bottom-2 right-0 text-xs">✂</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 h-[380px] ">
                {recommended.map(product => {
                    const finalPrice = product.price * (1 - product.discount / 100);
                    
                    return (
                        <div 
                            key={product._id}
                            className="group rounded-2xl overflow-hidden hover:shadow-md shadow-pink-400 transition-shadow duration-300"
                        >
                        <Link to={`/products/${encodeURIComponent(product.name)}`}>
                            <div className="relative h-[70%] overflow-hidden" onClick={scrollContentProduct}>
                                <img
                                    src={product.image[0]?.url || '/placeholder-product.jpg'}
                                    alt={product.name}
                                    className="w-full h-full object-cover cursor-pointer transition-transform duration-500 ease-in-out group-hover:scale-105"
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

                            <div className="p-3">
                                <p className='text-center text-sm capitalize'>{product.categories.map(cat => cat.name.toLowerCase())}</p>
                                <h4 className="font-bold truncate text-center text-md text-black uppercase">{product.name}</h4>
                                <div className="flex justify-center items-center gap-3 mt-1">
  
                                    {product.discount > 0 && (
                                        <span className="text-gray-500 text-md line-through ml-2 font-bold">
                                            S/ {product.price.toFixed(2)}
                                        </span>
                                    )}

                                    <span className="text-pink-400 font-bold text-md">
                                        S/ {finalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecommendedProducts;