import { CarOutlined, CustomerServiceOutlined, RollbackOutlined } from '@ant-design/icons'
import React, { useEffect, useRef } from 'react'
import ScrollReveal from "scrollreveal";

const ProductDescription = () => {
      const imgRef = useRef(null);
      const envioRef = useRef(null);
      const devolucionRef = useRef(null);
      const sr = useRef(null);

      // ANIMATION 
        useEffect(() => {
        sr.current = ScrollReveal({
            reset: false, 
            distance: '20px',
            duration: 1000,
            easing: 'cubic-bezier(0.5, 0, 0, 0.3)',
            viewFactor: 0.1, 
        });

        if (imgRef.current) {
            sr.current.reveal(imgRef.current, {
                origin: 'bottom',
                delay: 300,
            });
        }

        if (envioRef.current) {
            sr.current.reveal(envioRef.current, {
                origin: 'left',
                delay: 500,
            });
        }

        if (devolucionRef.current) {
            sr.current.reveal(devolucionRef.current, {
                origin: 'left',
                delay: 700,
            });
        }


        return () => {
            if (sr.current) {
                sr.current.clean(imgRef.current);
                sr.current.clean(envioRef.current);
                sr.current.clean(devolucionRef.current);
            }
        };
    }, []);
  
    return (

        <div className='pt-10 w-full justify-center items-center flex flex-col'>
        <article className='flex md:flex-row flex-col gap-10 p-10 sm:p-6 max-[520px]:p-4'>
          <div ref={imgRef}>
            <h6 className='text-sm sm:text-lg font-bold text-pink-500'>ENVÍO <CarOutlined/></h6>
            <p className='text-[10px] sm:text-[14px]'>Si quieres conocer más sobre nuestros métodos de envío haz click aquí.</p>
          </div>
          <div ref={envioRef}>
            <h6 className='text-sm sm:text-lg font-bold text-pink-500'>ASESORÍA EN LÍNEA <CustomerServiceOutlined /></h6>
            <p className='text-[10px] sm:text-[14px]'>Si tienes alguna duda con tu compra online escríbenos al Whatsapp: 927987259.</p>
          </div>
          <div ref={devolucionRef}>
            <h6 className='text-sm sm:text-lg font-bold text-pink-500'>DEVOLUCIONES <RollbackOutlined /></h6>
            <p className='text-[10px] sm:text-[14px]'>Para para conocer la política de cambios y devoluciones haz click aquí.</p>
          </div>
        </article>
      </div>

    )
}

export default ProductDescription
