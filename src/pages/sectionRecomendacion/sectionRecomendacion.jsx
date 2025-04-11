import styles from "../../styles/SectionRecomen.module.css";
import image1 from "../../assets/image/exfoliantedelabios.jpeg";
import image2 from "../../assets/image/aceitecaden.jpeg";
import image3 from "../../assets/image/aceitegirasol.jpeg";
import image4 from "../../assets/image/aceitedemasaje.jpeg";
import image5 from "../../assets/image/aceitedeargan.jpeg";
import image6 from "../../assets/image/exfoliantecorporal.jpeg";
import image7 from "../../assets/image/aguaderosas.jpeg";
import image8 from "../../assets/image/salesdepies.jpeg";



const products = [
    { id: 1, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: image1 },
    { id: 2, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: image2 },
    { id: 3, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: image3 },
    { id: 4, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: image4 },
    { id: 5, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: image5 },
    { id: 6, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: image6 },
    { id: 7, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: image7 },
    { id: 8, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: image8 },
];



const sectionRecomendacion = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recomendado para ti</h2>
            <p className={styles.subtitle}>Descubre nuestros productos más populares y las 
                ultimas novedades
            </p>
            <div className={styles.grid}>
            {products?.map((product) => (
                    <div key={product.id} className={styles.cardproduc}>
                        <img src={product.image}  className={styles.imageproduc} width='50px' />
                        <div className={styles.infoproduc}>
                            <span className={styles.categoryproduc}>{product.category}</span>
                            <h3 className={styles.nameproduc}>{product.name}</h3>
                            <p className={styles.priceproduc}>{product.price}</p>
                            <p className={styles.ratingproduc}>⭐ {product.rating}</p>
                        </div>
                    </div>
                ))}
                    </div>
                        <a href="/products"><button className={styles.buttonprod}>Ver más productos</button></a>
                    </div>
    );


    
};


export default sectionRecomendacion;