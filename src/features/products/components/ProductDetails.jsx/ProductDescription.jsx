import { CarOutlined, CustomerServiceOutlined, RollbackOutlined } from '@ant-design/icons'
import React from 'react'

const ProductDescription = () => {
    return (
        <div className='w-full'>
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
