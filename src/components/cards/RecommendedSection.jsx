import React from "react";
import { ProductGrid } from "./ProductGrid";
import styles from "./RecommendedSection.module.css";

 const RecommendedSection = () => {
  // Datos de ejemplo basados en la imagen
  const products = [
    {
      id: "1",
      image: "/placeholder.svg?height=180&width=180",
      category: "Cosméticos",
      name: "Exfoliante de labios",
      price: "S/20.00",
      rating: 4.8,
    },
    {
      id: "2",
      image: "/placeholder.svg?height=180&width=180",
      category: "Cosméticos",
      name: "Exfoliante de labios",
      price: "S/20.00",
      rating: 4.8,
    },
    {
      id: "3",
      image: "/placeholder.svg?height=180&width=180",
      category: "Cosméticos",
      name: "Exfoliante de labios",
      price: "S/20.00",
      rating: 4.8,
    },
    {
      id: "4",
      image: "/placeholder.svg?height=180&width=180",
      category: "Cosméticos",
      name: "Exfoliante de labios",
      price: "S/20.00",
      rating: 4.8,
    },
    {
      id: "5",
      image: "/placeholder.svg?height=180&width=180",
      category: "Cosméticos",
      name: "Exfoliante de labios",
      price: "S/20.00",
      rating: 4.8,
    },
    {
      id: "6",
      image: "/placeholder.svg?height=180&width=180",
      category: "Cosméticos",
      name: "Exfoliante de labios",
      price: "S/20.00",
      rating: 4.8,
    },
    {
      id: "7",
      image: "/placeholder.svg?height=180&width=180",
      category: "Cosméticos",
      name: "Exfoliante de labios",
      price: "S/20.00",
      rating: 4.8,
    },
    {
      id: "8",
      image: "/placeholder.svg?height=180&width=180",
      category: "Cosméticos",
      name: "Exfoliante de labios",
      price: "S/20.00",
      rating: 4.8,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recomendado para ti</h2>
        <p className={styles.subtitle}>Descubre nuestros productos más populares y las últimas novedades.</p>
      </div>
      <ProductGrid products={products} />
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Ver más productos...</button>
      </div>
    </section>
  );
};


export default RecommendedSection;
