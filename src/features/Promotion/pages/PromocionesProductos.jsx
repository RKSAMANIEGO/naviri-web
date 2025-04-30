import styles from "./PromocionesProductos.module.css";
import { useEffect, useState } from "react";
import { StarRating } from "../components/StarRating/StarRating.jsx";
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
              {/*<StarRating rating={producto.rating || 0} />*/}
              <div className={styles.price}>
                <span className={styles.precioOriginal}>
                  S/{Number(producto.price).toFixed(2)}
                </span>
                <span className={styles.precioOferta}>
                 Ahorra S/{Number(producto.price - (producto.price * (producto.discount / 100))).toFixed(2)}
                </span>
              </div>
              <p className={styles.descuento}>
                Dscto S/{Number(producto.price * (producto.discount / 100)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromocionesProductos;
