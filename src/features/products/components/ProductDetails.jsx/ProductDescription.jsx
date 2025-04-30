import React from 'react'

const ProductDescription = ({product}) => {
    return (
        <div className='w-full'>
            <p className='flex gap-10  text-center cursor-pointer'><a className=' text-pink-500 text-3xl border-b-2 border-white hover:border-b-2 hover:border-pink-500 font-bold border-dashed'>Descripción</a></p>
            
            <div className='p-10'>
                <h6 className='text-2xl text-pink-500'>Beneficios</h6>
                <ul>
                    {product.benefits.map(obj =>(
                        <li>{obj}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductDescription
