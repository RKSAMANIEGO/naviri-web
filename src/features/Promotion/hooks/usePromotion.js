import { useEffect, useState } from 'react';
import { listProducts } from "../services/adminProductsApi.js";

export const usePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const responseTotal = await listProducts();
        const total = responseTotal?.data?.total || 0;

        if (total > 0) {
          const responseProducts = await listProducts(1, total);
          const allProducts = responseProducts?.data?.data || [];
          const discountedProducts = allProducts.filter(p => p.discount > 0);
          setPromotions(discountedProducts);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return { promotions, loading, error };
};