import styles from "./PromocionesProductos.module.css"
/* import  {getPromotions} from '../services/promotionService.js' */
import { useEffect, useState } from "react"
import { listProducts } from "../services/adminProductsApi.js"
import { use } from "react";

const PromocionesProductos = () => {

  const [totalProducts, setTotalProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [productFilter, setProductFilter] = useState(null);

const listsProducts =async()=>{
    const response = await listProducts();
    response && setTotalProducts(response.data.total);
}

const listarProductos =async(page,totalProducts)=>{
  const response = await listProducts(page,totalProducts);
   response && setProducts(response.data.data);
}


  useEffect(() => {
    if(totalProducts) {
     listarProductos(1,totalProducts);
    }
  },[totalProducts])

  useEffect(() => { 
    listsProducts(1);
  }, []);
  // Simulación de datos de productos (esto debería venir de una API o base de datos)
  const filtrarProductos = ()=>{
    if(products){
      console.log(products);
      if(products.length> 0) {
        const productosFiltrados= products.filter(producto => producto.discount > 0);
        setProductFilter(productosFiltrados);
        console.log(productosFiltrados);
      }
    }
  }

  useEffect(() => {
    filtrarProductos();
  },[])

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Nuestras Promociones</h2>
      <div className={styles.productosGrid}>
        {productFilter && productFilter.map((producto) => (
          <div key={producto.id} className={styles.tarjetaProducto}>
            <div className={styles.imagenContenedor}>
              <img
                src={producto.image.url || "/placeholder.svg"}
                alt={producto.name}
                className={styles.imagenProducto}
              />
              <span className={styles.etiquetaPromocion}>Promoción</span>
            </div>
            <div className={styles.infoProducto}>
              <h3 className={styles.nombreProducto}>{producto.name}</h3>
              <div className={styles.price}>
                <span className={styles.precioOriginal}>${Number(producto.price).toFixed(2)}</span>
                <span className={styles.precioOferta}>${Number(producto.price-(producto.price*(producto.discount/100))).toFixed(2)}</span>
              </div>
              <p className={styles.descuento}>Dscto {`S/${Number((producto.price * (producto.discount/100))).toFixed(2)}`}</p>
              <button className={styles.botonComprar}>Comprar ahora</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PromocionesProductos
