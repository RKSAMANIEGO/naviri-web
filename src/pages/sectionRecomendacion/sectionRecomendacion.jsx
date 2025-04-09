import styles from "../../styles/SectionRecomen.module.css";


const products = [
    { id: 1, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: '/../src/assets/image/exfoliantedelabios.jpeg'},
    { id: 2, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: '/../src/assets/image/aceitecaden.jpeg'},
    { id: 3, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: '/../src/assets/image/aceitegirasol.jpeg'},
    { id: 4, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: '/../src/assets/image/aceitedemasaje.jpeg' },
    { id: 5, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: '/../src/assets/image/aceitedeargan.jpeg'},
    { id: 6, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: '/../src/assets/image/exfoliantecorporal.jpeg'},
    { id: 7, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: '/../src/assets/image/aguaderosas.jpeg'},
    { id: 8, name: 'Exfoliante de labios', category: 'Cosméticos', price: 'S/20.00', rating: '4.8', image: '/../src/assets/image/salesdepies.jpeg' },
];



const sectionRecomendacion = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recomendado para ti</h2>
            <p className={styles.subtitle}>Descubre nuestros productos más populares y las 
                ultimas novedades
            </p>
            <div className={styles.grid}>
            {products.map((product) => (
                    <div key={product.id} className={styles.cardproduc}>
                        <img src={product.image} alt={product.name} className={styles.imageproduc} />
                        <div className={styles.infoproduc}>
                            <span className={styles.categoryproduc}>{product.category}</span>
                            <h3 className={styles.nameproduc}>{product.name}</h3>
                            <p className={styles.priceproduc}>{product.price}</p>
                            <p className={styles.ratingproduc}>⭐ {product.rating}</p>
                        </div>
                    </div>
                ))}
                    </div>
                       <button className={styles.buttonprod}>Ver más productos</button>
                    </div>
    );


    
};


export default sectionRecomendacion;