import React from "react";
import { ProductCard } from "../ProductCard/ProductCard"; // Updated path
import styles from "./ProductGrid.module.css"; // Path remains relative

export const ProductGrid = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div key={product.id} className={styles.gridItem}>
          <ProductCard
            image={product.image}
            category={product.category}
            name={product.name}
            price={product.price}
            rating={product.rating}
          />
        </div>
      ))}
    </div>
  );
};