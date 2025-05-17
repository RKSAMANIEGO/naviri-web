import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { productByName } from '../../services/productsApi';
import { LeftOutlined, LoadingOutlined, RightOutlined, ScissorOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from '../producto.module.css'
import { useCart } from '../../../cart/context/CartContext';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import ProductDescription from './ProductDescription';
import RecommendedProducts from './RecommendedProducts';
import {lanzarConfetti} from '../../../../shared/animation/Confetti/confetti';
const ProductDetails = () => {

    const [productSelection, setProductSelection]= useState(null);
    const { addToCart } = useCart();
    const {name}=useParams();

    const [indexImg,setIndexImg]=useState(0);



    useEffect(()=>{
        const productSelected = async(nameProduct)=>{
            const response = await productByName(nameProduct);
            if(response) {
                // console.log(response.data.data[0]);
                setProductSelection(response.data.data[0]);
            }
        } 
        productSelected(name);
    },[name])

    
    //CART PRODUCT
    const handleAddToCart = (product) => {
        addToCart(product);
        lanzarConfetti();
    };

    //BTN WSP 
    const handleWhatsappCheckout = (product) => {
        const price = Number(product.price) || 0;
        const discount = Number(product.discount) || 0;
    
        const discountedPrice = (price * (1 - discount / 100)).toFixed(2);
        const finalPrice = discount > 0 ? discountedPrice : price.toFixed(2);
    
        const message = discount > 0
        ? `¡Hola! Me interesa comprar el producto ${product.name}.S/ ${finalPrice} (antes: S/ ${price.toFixed(2)}). ¿Podría darme más información?`
        : `¡Hola! Me interesa comprar el producto ${product.name} por S/ ${finalPrice}. ¿Podría darme más información?`;
    
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/+51927987259?text=${encodedMessage}`, '_blank');
    };
    
    // BTN OF THE IMAGES
    const nextImg = (longitudImg) =>  (indexImg < longitudImg-1) ? setIndexImg(indexImg+1): setIndexImg(0);

    const prevImg = (longitudImg) => (indexImg > 0) ? setIndexImg(indexImg-1) : setIndexImg(longitudImg-1);
    
    const handlerSelectImg=(index) => setIndexImg(index);


    return (
        <> 
        {productSelection ?
            <div id="content" className='scroll-mt-12 flex flex-col w-full'>
                <div className='flex md:flex-row flex-col gap-5 md:gap-10 w-full p-10 max-[520px]:p-4'>
                    <div className='overflow-hidden relative pt-0  rounded-t-2xl w-[auto] md:w-1/2  h-[auto] md:h-[520px]'>  
                        <img 
                            className=' w-[auto] md:w-full h-[auto] md:h-[600px] rounded-t-2xl object-cover object-[50%_80%] cursor-pointer transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-t-2xl'
                            src={productSelection.image[indexImg].url}
                            alt={`imagen de ${productSelection.name}`}
                        />
                        <span onClick={()=>prevImg(productSelection.image.length)} className='absolute top-[45%] left-2 sm:left-5 text-pink-600 hover:text-white'> <LeftOutlined disabled="true" className='text-sm sm:text-xl bg-[rgba(255,255,245,0.3)] rounded-[50%] p-4 cursor-pointer hover:bg-pink-400'/> </span>
                        <span onClick={()=>nextImg(productSelection.image.length)}  className='absolute top-[45%] right-2 sm:right-5  text-pink-600 hover:text-white'> <RightOutlined  className='text-sm  sm:text-xl bg-[rgba(255,255,245,0.3)] rounded-[50%] p-4 cursor-pointer hover:bg-pink-400'/> </span>
                        
                        <label className='absolute bottom-3 left-[50%] text-gray-500 text-5xl cursor-pointer'> 
                            {productSelection.image.map((_ ,index) => 
                                <span onClick={()=> handlerSelectImg(index)} key={index}  className={`${indexImg === index ? "text-pink-600 translate-x-4 shadow-2xl text-[3rem]":''} `}>.</span>
                            )}
                        </label>

                        {productSelection.discount > 0 && 
                            <label className='absolute top-5 right-5 py-1 px-2 text-sm rounded-sm bg-pink-600 text-white font-bold'>
                                -{productSelection.discount}%
                            </label>
                        }
                    </div>
            
                    <div className='flex flex-col gap-4 lg:my-5 md:w-1/2 w-full'>
                        <h2 className='text-[#505666] text-2xl sm:text-3xl lg:text-4xl font-bold capitalize relative w-[95%]'>
                            {productSelection.name}
                        </h2>
                        <p className='text-[12px] sm:text-[13px] lg:text-[16px]'>{productSelection.compatibility}</p>
                        {/*----BENEFICIOS----*/}
                        <div >
                            <h6 className='text-lg font-bold text-pink-500'>BENEFICIOS</h6>
                            <ul>
                                {productSelection.benefits.map((obj, i) => (
                                    <li className= 'text-[10px] sm:text-[13px] lg:text-[14px]' key={i}>{obj}</li>
                                ))}
                            </ul>
                        </div>
            
                        <span className='text-[12px] sm:text-[14px] font-bold'>
                            <ShoppingCartOutlined /> Disponible solo para la ciudad de Lima.
                        </span>
            
                        <label className='flex gap-3 items-center text-pink-500 font-bold text-lg'>
                            S/ {(Number(productSelection.price) - (Number(productSelection.price) * (productSelection.discount / 100))).toFixed(2)} 
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
                                <FaWhatsapp /> Comprar
                            </button>
                        </section>
                                
                    </div>
                </div>
            
                {productSelection.use_case && (
                    <div className='px-10'>
                        <h6 className='text-lg font-bold text-pink-500'>Modo de Uso</h6>
                        <div
                            className="prose lg:prose-lg text-gray-700 mx-auto text-left"
                            style={{ whiteSpace: 'pre-line' }}
                        >
                        {productSelection.use_case}
                        </div>
                    </div>
                )}

                <ProductDescription product={productSelection} />
                <RecommendedProducts currentProductId={productSelection?._id} />
                

                
            </div>            
            :
            <label className='flex flex-col items-center mt-20 gap-5'><LoadingOutlined className='text-4xl font-bold'/> Cargando ...</label>                
        }
        </>
    )
}

export default ProductDetails
