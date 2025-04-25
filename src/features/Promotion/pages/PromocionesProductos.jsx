import styles from "./PromocionesProductos.module.css"
import aceiteOregano from "../../../assets/image/aceideOREGANO.jpeg"
import aceiteArbolTe from "../../../assets/image/aceiteARBOLDETE.jpeg"
import aceitegirasol from '../../../assets/image/aceitegirasol.jpeg'
import aceitejazmin from '../../../assets/image/aceiteJAZMIN.jpeg'
import { useEffect } from "react"
import { getPromotions } from "../../../core/services/promotionService.js"

const PromocionesProductos = () => {
  
  const listPromotion =async() =>{
      const responsive = await getPromotions();
      console.log(responsive.data);
  }

    // Simulación de datos de productos (esto debería venir de una API o base de datos)
  useEffect(() => {
    listPromotion()
  }, [])


  const productos = [
    {
      id: 1,
      nombre: "BOX INIGUALABLE",
      imagenUrl: aceiteOregano,
      precioOriginal: 200.0,
      precioOferta: 185.0,
      descuento: 15.0,
    },
    {
      id: 2,
      nombre: "CAJA MAGIA FE",
      imagenUrl: aceiteArbolTe,
      precioOriginal: 130.0,
      precioOferta: 120.0,
      descuento: 10.0,
    },
    {
      id: 3,
      nombre: "DESAYUNO MAGIA FE",
      imagenUrl: aceitegirasol,
      precioOriginal: 190.0,
      precioOferta: 180.0,
      descuento: 10.0,
    },
    {
      id: 4,
      nombre: "PACK SEÑORITA",
      imagenUrl: aceitejazmin,
      precioOriginal: 98.0,
      precioOferta: 86.0,
      descuento: 12.0,
    },
  ]

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Nuestras Promociones</h2>
      <div className={styles.productosGrid}>
        {productos.map((producto) => (
          <div key={producto.id} className={styles.tarjetaProducto}>
            <div className={styles.imagenContenedor}>
              <img
                src={producto.imagenUrl || "/placeholder.svg"}
                alt={producto.nombre}
                className={styles.imagenProducto}
              />
              <span className={styles.etiquetaPromocion}>Promoción</span>
            </div>
            <div className={styles.infoProducto}>
              <h3 className={styles.nombreProducto}>{producto.nombre}</h3>
              <div className={styles.precios}>
                <span className={styles.precioOriginal}>${producto.precioOriginal.toFixed(2)}</span>
                <span className={styles.precioOferta}>${producto.precioOferta.toFixed(2)}</span>
              </div>
              <p className={styles.descuento}>Desde de ${producto.descuento.toFixed(2)}</p>
              <button className={styles.botonComprar}>Comprar ahora</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PromocionesProductos
