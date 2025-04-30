
import styles from "./PromocionesProductos.module.css";
import { useEffect, useState } from "react";
import { listProducts } from "../services/adminProductsApi.js";

const PromocionesProductos = () => {
  const [productFilter, setProductFilter] = useState([]);

  useEffect(() => {
    const fetchProductsWithDiscount = async () => {
      try {
        const responseTotal = await listProducts();
        const total = responseTotal?.data?.total || 0;

        if (total > 0) {
          
          const responseProducts = await listProducts(1, total);
          const products = responseProducts?.data?.data || [];

          
          const productosConDescuento = products.filter(producto => producto.discount > 0);
          setProductFilter(productosConDescuento);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProductsWithDiscount();
  }, []);

/*
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

    
  useEffect(() => {
    listPromotion()
  }, [])

    fetchProductsWithDiscount();
  }, []);
*/

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Nuestras Promociones</h2>
      <div className={styles.productosGrid}>
        {productFilter.map((producto) => (
          <div key={producto.id} className={styles.tarjetaProducto}>
            <div className={styles.imagenContenedor}>
              <img
                src={producto.image?.url || "/placeholder.svg"}
                alt={producto.name}
                className={styles.imagenProducto}
              />
              <span className={styles.etiquetaPromocion}>Promoción</span>
            </div>
            <div className={styles.infoProducto}>
              <h3 className={styles.nombreProducto}>{producto.name}</h3>
              <div className={styles.price}>
                <span className={styles.precioOriginal}>
                  ${Number(producto.price).toFixed(2)}
                </span>
                <span className={styles.precioOferta}>
                  ${Number(producto.price - (producto.price * (producto.discount / 100))).toFixed(2)}
                </span>
              </div>
              <p className={styles.descuento}>
                Dscto S/{Number(producto.price * (producto.discount / 100)).toFixed(2)}
              </p>
              <button className={styles.botonComprar}>Comprar ahora</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};*/

export default PromocionesProductos;
