import React from 'react'

const ContentCaseUse = ({data}) => {
  return (
    <div className='flex justify-center'>
    <div className='flex flex-col gap-10 w-[auto]'>
        <div className=''>
            <img  src='https://i0.wp.com/ainhoabio.pe/wp-content/uploads/2019/06/IconosDeConfianza-vFinal.png?w=378&ssl=1'/>
        </div>
        <div>
            <h6 className='text-lg font-bold text-pink-500'>Modo de Uso</h6>
                <div
                className="prose lg:prose-lg text-gray-700 mx-auto text-left"
                style={{ whiteSpace: 'pre-line' }}
                >
                {data}
                </div>
        </div>
        <div>
              <img src='https://i0.wp.com/ainhoabio.pe/wp-content/uploads/2022/03/Icono-vFinal-1.png?w=362&ssl=1' />
        </div>
      
    </div>
    </div>
  )
}

export default ContentCaseUse