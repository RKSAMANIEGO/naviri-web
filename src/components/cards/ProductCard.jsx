import React from "react";
import styles from "./ProductCard.module.css";
import { StarRating } from "./StarRating";

export const ProductCard = ({ image, category, name, price, rating }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image || "/placeholder.svg"} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
};
