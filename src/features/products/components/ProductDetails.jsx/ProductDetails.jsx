import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { productByName } from '../../services/productsApi';
import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from '../producto.module.css'
import { useCart } from '../../../cart/context/CartContext';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import ProductDescription from './ProductDescription';

const ProductDetails = () => {

    const [productSelection, setProductSelection]= useState(null);
    const {name}=useParams();
    const { addToCart } = useCart();

    useEffect(()=>{
        const productSelected = async(nameProduct)=>{
            const response = await productByName(nameProduct);
            if(response) {
                console.log(response.data.data[0]);
                setProductSelection(response.data.data[0]);
            }
        } 
        productSelected(name);
    },[name])

    
    
    //CART PRODUCT
    const handleAddToCart = (product) => {
        addToCart(product);
    };

    //BTN WSP 
    const handleWhatsappCheckout = (product) => {
        const message = `¡Hola! Me interesa comprar el producto ${product.name} por ${product.price}. ¿Podría darme más información?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/+51927987259?text=${encodedMessage}`, '_blank');
    };

    return (
        <> 
            {productSelection ?
                <div className='flex flex-col w-full'>
                    <div className='flex gap-10 w-full p-10'>
                        <div className='relative w-1/2 h-[500px]'>  
                            <img className='w-full h-[500px]  object-cover rounded-t-2xl' src={productSelection.image.url} alt={`imagen de ${productSelection.name}`}/>
                            {productSelection.discount > 0 && 
                            <label className='absolute top-5 right-5 py-1 px-3 rounded-xl bg-pink-700 text-white font-bold'>-{productSelection.discount}%</label>}
                        </div>
                
                        <div className='flex flex-col w-1/2'>
                            <h1 className='text-pink-500 text-4xl font-bold capitalize border-b-2 border-pink-300 border-dashed pb-5'>{productSelection.name}</h1><br/>
                            <span className=''>{productSelection.compatibility}</span> <br/>
                            <span> <ShoppingCartOutlined/> Disponible solo para la ciudad de Lima.</span> <br/>
                            <label className='flex gap-3 items-center text-pink-500 font-bold text-lg' >S/ {(Number(productSelection.price)-(Number(productSelection.price)*(productSelection.discount/100))).toFixed(2)} <s className='text-xs text-gray-600'> S/ {Number(productSelection.price).toFixed(2)} </s> </label>
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
                </div>
            :
                <label className='flex flex-col items-center gap-5'><LoadingOutlined className='text-4xl font-bold'/> Cargando ...</label>
                
            }
        </>
    )
}

export default ProductDetails
