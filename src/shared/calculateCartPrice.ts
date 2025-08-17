import { ProductItem } from '../products/types/products';

export const calculateCartPrice = (arr: ProductItem[]) => {
  return arr.reduce((a, b) => {
    return a + b.price;
  }, 0);
};
