import { GiftOutlined, ShoppingCartOutlined, SwapOutlined } from "@ant-design/icons"

const lima=[
  { id:1 , 
    currier:"«Courier 1 Altoque»", 
    description:[
    {id:1, date:"Lunes a Sábado ( 24 a 48 horas )" , locations:" Breña, Barranco, Cercado de Lima, Chorrillos, Jesús Maria, La Molina, La Victoria, Lince, Magdalena, Miraflores, Pueblo Libre, Surco, Surquillo, San Luis, San Borja, San Miguel, San Isidro, Santa Anita y Ate( hasta Real Plaza Puruchuco)" },
    {id:2, date:"Jueves" , locations:"El Agustino, Rimac y San Juan de Lurigancho* ( hasta estación Bayobar )." }
    ]
  },
  { id:2 , 
    currier:"«Courier 2 Y»", 
    description:[
    {id:1, date:"Martes, Jueves y Sábados" , locations:"San Martín, Callao* ( No ventanilla ), S.J Miraflores, Villa Maria y Villa el Salvador." },
    {id:2, date:"Martes" , locations:"Carabayllo y Puente Piedra* ( hasta Tottus ) y Comas* ( hasta la comiseria de collique )" },
    {id:3, date:"Miércoles y Sábado" , locations:"Los Olivos, independencia " }
    ]
  }
  
]
const provincia=[
  "Envíos a nivel nacional",
  "Entregamos envíos a Olva Courier 3 veces por semana ( Lunes, Miércoles y Viernes )",
  "Una vez entregado tu pedido a Olva recibirás un correo de que tu pedido está en camino y podrás solicitar tu número de Tracking al día siguiente.",
  "Los tiempos de entrega de Olva Courier son de 3 a 5 días hábiles, una vez recibas el correo que tu pedido está en camino.",
  "Entregamos en la puerta de tu casa o puedes solicitar que sea enviado a la agencia de Olva de tu Ciudad."
]
const pedidos= [
  {id:1 , questions:"¿Qué debo hacer si me llega un artículo defectuoso?", answers:["Ainhoa Bio solo vende artículos en perfecto estado. Sin embargo, si recibieras tu producto con alguna imperfección, te pedimos, te pongas en contacto con nosotros enviándonos un mensaje al e-mail hola@ainhoabio.pe y solucionaremos el inconveniente en el menor tiempo posible."]},
  {id:2, questions:"¿Qué debo hacer si me llega un producto incorrecto?", answers:["Si en alguna ocasión, por error, te llega un producto que no has comprado, ponte en contacto con nosotros de inmediato enviándonos un mensaje al e-mail hola@ainhoabio.pe"]},
  {id:3 , questions:"¿Qué debo hacer si no me llega un producto?", answers:["Si en alguna ocasión, por error, no te llega un producto que has comprado, ponte en contacto con nosotros de inmediato el mismo día de recibido tu compra con una foto de evidencia a nuestro número de WhatsApp o enviándonos un mensaje al e-mail hola@ainhoabio.pe"]},
  {id:4 , questions:"¿Dónde puedo recibir mi pedido?", answers:[
    "Puedes recibirlo en la dirección que elijas (domicilio, trabajo, etc.) a nivel nacional.",
    "Si es para Provincia, también puedes indicarnos que lo recogerás en la agencia de Olva Courier de tu localidad."
  ]},
  {id:5, questions:"¿La ciudad de entrega puede ser diferente al de la compra?", answers:["Sí, siempre y cuando la ciudad de entrega se encuentre dentro del Perú."] }
]
const devolucion =[
    {id:1, description:"En el caso de cancelación de orden, todos los productos se deben encontrar en perfectas condiciones y sin señales de uso."},
    {id:2, description:"No procederá el cambio o devolución, cuando se compruebe que el producto ha sufrido daño como resultado de un inadecuado uso o manipulación por parte del cliente."},
    {id:3, description:"Todos los productos tienen que venir con su empaque original."},
    {id:4, description:"Tienes 10 días, desde que recibiste el producto, para devolverlo a nuestras oficinas."},
]

const ShipmentPage = () => {
  return (
    <div className='flex flex-col gap-10 p-5 sm:p-10 '>

      <section className='flex flex-col gap-5'>
        <h2 className='text-[1.3rem] sm:text-3xl font-[900] text-pink-500'>ENVÍOS Y ENTREGA <GiftOutlined  /></h2>
          <p className="text-[12px] sm:text-[16px]">Al finalizar tu pedido recibirás automáticamente un correo de confirmación con todos los detalles.</p>
          <p className="text-[12px] sm:text-[16px]">Los plazos de entrega se contabilizan desde que verificamos el pago de tu compra.</p>
          <h3 className='text-lg sm:text-2xl font-bold text-gray-600 underline'>Para Lima</h3>
          {lima.map(item => (
              <section key={item.id}>
                  <p className='text-[14px] sm:text-[16px] font-bold pt-5'>{item.currier}</p>
                  <ul>
                    {item.description.map(des => (
                      <li key={des.id} className='py-3 px-3'>
                          <p className="text-[14px] sm:text-[16px] font-bold">{des.date}</p>
                          <p className="text-[12px] sm:text-[16px]"><span className=' font-[600]'>Distritos: </span>{des.locations}</p>
                      </li>
                    )) }
                  </ul>
              </section>
          ))}
          <h3 className='text-lg sm:text-2xl  font-bold text-gray-600 underline'>Para Provincia</h3>
          <ul className='flex flex-col gap-5 px-3'>
              {provincia.map((item,index) => (
                <li className="text-[12px] sm:text-[16px]" key={index}>- {item}</li>
              ))}
          </ul>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className='text-[1.3rem] sm:text-3xl font-[900] text-pink-500 '>PEDIDOS Y PRODUCTOS <ShoppingCartOutlined /></h2>
        <ul className="flex flex-col gap-5">
           {pedidos.map(item=>(
            <li  key={item.id}>
                        <span className="text-[12px] sm:text-[16px] font-[700]">{item.questions}</span> 

                        {item.answers.map((answer,index) => (
                          <p className="text-[12px] sm:text-[16px]" key={index}>{answer}</p>
                        ))}
            </li>
           ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className='text-[1.3rem] sm:text-3xl font-[900] text-pink-500 '>CAMBIOS Y DEVOLUCIONES <SwapOutlined /> </h2>
        <p className="text-[12px] sm:text-[16px]">Si no estás satisfecho con los productos que compraste por algún desperfecto que pudieran presentar, tienes 7 días para solicitar un cambio, siempre y cuando cumplas con las siguientes condiciones:</p>
        <ul className="flex flex-col gap-5">
          {devolucion.map(item=>  <li className="text-[12px] sm:text-[16px]" key={item.id}>* {item.description}</li>)}
        </ul>   
        <p className="text-[12px] sm:text-[16px]">Al devolver o cambiar un producto, es muy importante que envíes un correo a hola@ainhoabio.pe con la información de por qué deseas realizar la devolución y esperar nuestra respuesta aprobando tu solicitud.</p>
      </section>
    </div>
  )
}

export default ShipmentPage

