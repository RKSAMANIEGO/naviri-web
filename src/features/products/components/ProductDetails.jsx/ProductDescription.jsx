import { CarOutlined, CustomerServiceOutlined, RollbackOutlined } from '@ant-design/icons'
import React from 'react'

const ProductDescription = () => {
    return (
        <div className='w-full'>
            
            {/*
            <p className='flex gap-10  justify-center text-center cursor-pointer'><a className=' text-center text-pink-500 text-3xl border-b-2 border-white hover:border-b-2 hover:border-pink-500 font-bold border-dashed'>Mas Información</a></p>

            <div className='p-10'>
                <h6 className='text-2xl text-pink-500'>BENEFICIOS</h6>
                <ul>
                    {product.benefits.map(obj =>(
                        <li>{obj}</li>
                    ))}
                </ul>
            </div>
             */}

            <article className='flex gap-10 p-10'>
                <div>
                    <h6 className='text-lg font-bold text-pink-500'>ENVÍO <CarOutlined/></h6>
                    <p className='text-[14px]'>Si quieres conocer más sobre nuestros métodos de envío haz click aquí.</p>
                </div>
                <div>
                    <h6 className='text-lg font-bold text-pink-500'>ASESORÍA EN LÍNEA <CustomerServiceOutlined /></h6>
                    <p className='text-[14px]'>Si tienes alguna duda con tu compra online escríbenos al Whatsapp: 927987259.</p>
                </div>
                <div>
                    <h6 className='text-lg font-bold text-pink-500'>DEVOLUCIONES <RollbackOutlined /></h6>
                    <p className='text-[14px]'>Para para conocer la política de cambios y devoluciones haz click aquí.</p>
                </div>
            </article>
            
        </div>
    )
}

export default ProductDescription
