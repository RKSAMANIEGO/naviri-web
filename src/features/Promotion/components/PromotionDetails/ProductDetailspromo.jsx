import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productByName } from "../../services/promotionService";
import { LoadingOutlined, ScissorOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from "../../styles/producto.module.css";
import { useCart } from "../../../cart/context/CartContext";
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import ProductDescription from "../PromotionDetails/ProductDescription";
import PromotionModal from '../PromotionDetails/PromotionModal';

const ProductDetailspromo = () => {
    const [productSelection, setProductSelection] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const { addToCart } = useCart();
    const { name } = useParams();

    useEffect(() => {
        const productSelected = async(nameProduct) => {
            const response = await productByName(nameProduct);
            if(response) {
                setProductSelection(response.data.data[0]);
            }
        }; 
        productSelected(name);
    }, [name]);

    
    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleWhatsappCheckout = (product) => {
        const message = `¡Hola! Me interesa comprar el producto ${product.name} por S/${(Number(product.price)-(Number(product.price)*(product.discount/100))).toFixed(2)} (${product.discount}% de descuento). ¿Podría darme más información?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/+51927987259?text=${encodedMessage}`, '_blank');
    };

    const toggleDetailsModal = () => {
        setShowDetailsModal(!showDetailsModal);
    };

    return (
        <> 
            {productSelection ? (
                <div className='flex flex-col w-full'>
                    <div className='flex gap-10 w-full p-10'>
                        
                        <div 
                          className='overflow-hidden relative rounded-t-2xl w-1/2 h-[520px] cursor-pointer'
                          onClick={toggleDetailsModal}
                        >  
                            <img 
                              className='w-full h-[600px] rounded-t-2xl object-cover object-[50%_80%] transition-all duration-500 ease-in-out hover:scale-105' 
                              src={productSelection.image.url} 
                              alt={`imagen de ${productSelection.name}`}
                            />
                            {productSelection.discount > 0 && 
                            <label className='absolute top-5 right-5 py-1 px-3 rounded-xl bg-pink-700 text-white font-bold'>
                              -{productSelection.discount}%
                            </label>}
                        </div>
                
                        <div className='flex flex-col gap-4 my-5 w-1/2'>
                     
                            <h1 
                              className='text-pink-400 text-4xl font-bold capitalize border-b-2 border-pink-300 border-dashed pb-3 relative w-[95%] cursor-pointer'
                              onClick={toggleDetailsModal}
                            >
                              {productSelection.name} 
                              <ScissorOutlined className='rotate-180 absolute -bottom-[10px] -right-5 text-[20px]'/> 
                            </h1>
                            
                            <p className=''>{productSelection.compatibility}</p>
                            
                            <div className='text-[12px]'>
                                <h6 className='text-lg font-bold text-pink-500'>BENEFICIOS</h6>
                                <ul>
                                    {productSelection.benefits.map((obj, index) => (
                                      <li key={index}>{obj}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            <span className='font-bold'>
                              <ShoppingCartOutlined/> Disponible solo para la ciudad de Lima.
                            </span>
                            
                            <label className='flex gap-3 items-center text-pink-500 font-bold text-lg'>
                              S/ {(Number(productSelection.price)-(Number(productSelection.price)*(productSelection.discount/100))).toFixed(2)}
                              <s className='text-xs text-gray-600'> S/ {Number(productSelection.price).toFixed(2)} </s>
                            </label>
                            
                            <section className={styles.productActions}>
                                <button
                                    className={`btn btn-secondary ${styles.addToCartBtn}`}
                                    onClick={() => handleAddToCart(productSelection)}
                                >
                                    <FaShoppingCart /> Añadir
                                </button>
                                <button
                                    className={`btn btn-primary ${styles.buyBtn}`}
                                    onClick={() => handleWhatsappCheckout(productSelection)}
                                >
                                    <FaWhatsapp/> Comprar
                                </button>
                            </section>
                        </div>
                    </div>
                    
                    <ProductDescription product={productSelection}/>
                    
                 
                    {showDetailsModal && (
                        <PromotionModal
                            product={productSelection}
                            onClose={toggleDetailsModal}
                            onAddToCart={handleAddToCart}
                            onWhatsappCheckout={handleWhatsappCheckout}
                        />
                    )}
                </div>
            ) : (
                <label className='flex flex-col items-center gap-5'>
                    <LoadingOutlined className='text-4xl font-bold'/> 
                    Cargando ...
                </label>
            )}
        </>
    );
};

export default ProductDetailspromo;