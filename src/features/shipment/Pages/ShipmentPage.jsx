import { GiftOutlined, ShoppingCartOutlined, SwapOutlined, CheckCircleOutlined } from "@ant-design/icons"

const lima = [
  { 
    id: 1,
    currier: "Envíos en Puerto Maldonado",
    description: [
      {id: 1, date: "Lunes a sábado (9am a 8pm)", locations: "Delivery a domicilio"},
      {id: 2, date: "Recojo en tienda", locations: "En caso quieras recoger tu pedido, puedes acercarte a nuestro almacén en 2 de mayo 1311"}
    ]
  }
]

const provincia = [
  "Realizamos envío en la agencia de tu preferencia: (Shalom, Marvisur, Olva Courier, etc.)",
  "Los tiempos de entrega son de 3 a 5 días hábiles, una vez recibas el correo que tu pedido está en camino."
]

const pedidos = [
  {
    id: 1, 
    questions: "¿Qué debo hacer si me llega un artículo defectuoso?", 
    answers: [
      "Navi Natubelleza solo vende artículos en perfecto estado. Sin embargo, si recibieras tu producto con alguna imperfección, te pedimos, te pongas en contacto con nosotros enviándonos un mensaje vía WhatsApp y solucionaremos el inconveniente en el menor tiempo posible."
    ]
  }
]

const devolucion = [
  {id: 1, description: "En el caso de cancelación de orden, todos los productos se deben encontrar en perfectas condiciones y sin señales de uso."},
  {id: 2, description: "No procederá el cambio o devolución, cuando se compruebe que el producto ha sufrido daño como resultado de un inadecuado uso o manipulación por parte del cliente."},
  {id: 3, description: "Todos los productos tienen que venir con su empaque original."}
]

const ShipmentPage = () => {
  return (
    <div className='flex flex-col gap-10 p-5 sm:p-10'>
      <section className='flex flex-col gap-5'>
        <h2 className='text-[1.3rem] sm:text-3xl font-[900] text-[#f180a9]'>ENVÍOS Y ENTREGA <GiftOutlined /></h2>
        <p className="text-[12px] sm:text-[16px]">Al finalizar tu pedido recibirás un correo de confirmación con todos los detalles.</p>
        <p className="text-[12px] sm:text-[16px]">Los plazos de entrega se contabilizan desde que verificamos el pago de tu compra.</p>
        
        {lima.map(item => (
          <section key={item.id}>
            <h3 className='text-lg sm:text-2xl font-bold text-gray-600 underline'>{item.currier}</h3>
            <ul>
              {item.description.map(des => (
                <li key={des.id} className='py-3 px-3'>
                  <p className="text-[14px] sm:text-[16px] font-bold">{des.date}</p>
                  <p className="text-[12px] sm:text-[16px]">{des.locations}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <h3 className='text-lg sm:text-2xl font-bold text-gray-600 underline'>Envíos a nivel nacional</h3>
        <ul className='flex flex-col gap-5 px-3'>
          {provincia.map((item, index) => (
            <li className="text-[12px] sm:text-[16px]" key={index}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className='text-[1.3rem] sm:text-3xl font-[900] text-[#f180a9]'>PEDIDOS Y PRODUCTOS <ShoppingCartOutlined /></h2>
        <ul className="flex flex-col gap-5">
          {pedidos.map(item => (
            <li key={item.id}>
              <span className="text-[12px] sm:text-[16px] font-[700]">{item.questions}</span>
              {item.answers.map((answer, index) => (
                <p className="text-[12px] sm:text-[16px]" key={index}>{answer}</p>
              ))}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className='text-[1.3rem] sm:text-3xl font-[900] text-[#f180a9]'>CAMBIOS Y DEVOLUCIONES <SwapOutlined /></h2>
        <p className="text-[12px] sm:text-[16px]">Si no estás satisfecho con los productos que compraste por algún desperfecto que pudieran presentar, tienes 3 días para solicitar un cambio, siempre y cuando cumplas con las siguientes condiciones:</p>
        <ul className="flex flex-col gap-5">
          {devolucion.map(item => (
            <li className="text-[12px] sm:text-[16px]" key={item.id}>* {item.description}</li>
          ))}
        </ul>
        <p className="text-[12px] sm:text-[16px]">Al devolver o cambiar un producto, es muy importante que envíes un correo a navinatubelleza@gmail.com con la información de por qué deseas realizar la devolución y esperar nuestra respuesta aprobando tu solicitud.</p>
        
        <p className="text-[12px] sm:text-[16px] mt-2">
          En Navi Natubelleza todos nuestros productos pasan por un estricto control de calidad antes de ser enviados a fin de detectar posibles daños o defectos. Si recibes un producto que no se encuentre en perfectas condiciones, por favor contáctenos inmediatamente y envíanos una imagen del mismo. Para más información o dudas por favor escríbenos a navinatubelleza@gmail.com
        </p>
        
        <p className="text-[12px] sm:text-[16px]">
          También puede comunicarte con nosotros al WhatsApp a (927 987 259) en horario de oficina.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className='text-[1.3rem] sm:text-3xl font-[900] text-[#f180a9]'>NUESTRA FILOSOFÍA <CheckCircleOutlined /></h2>
        <p className="text-[12px] sm:text-[16px]">
          Todos los trabajos que realizamos en Navi Natubelleza están enfocados en crear productos naturales que respetan la piel y el medio ambiente. Elaboramos de forma natural utilizando ingredientes locales, puros y sostenibles, garantizando calidad, bienestar y conexión con la naturaleza en cada producto.
        </p>
      </section>
    </div>
  )
}

export default ShipmentPage