import React from "react";
import styles from "../StarRating/StarRating.module.css"; 

export const StarRating = ({ rating }) => {
  return (
    <div className={styles.rating}>
      <span className={styles.stars}>★★★★★</span>
      <span className={styles.ratingText}>{rating.toFixed(1)}</span>
    </div>
  );
};