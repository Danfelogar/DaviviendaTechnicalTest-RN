import { ProductItem } from '../types/products';
import jsonData from '../assets/data.json';

export const getProducts = async (): Promise<ProductItem[]> => {
  try {
    const res = jsonData.products;
    return res;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
