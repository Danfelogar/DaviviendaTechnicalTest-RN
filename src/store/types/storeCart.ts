import { ProductItem } from '../../products/types/products';

export interface storeCartActionsAndState {
  //states
  products: ProductItem[];
  cart: ProductItem[];
  totalPriceProduct: number;
  counterProduct: number;
  //functions
  getProducts: () => Promise<ProductItem[]>;
  addProduct: (product: ProductItem) => void;
  removeProduct: (id: string) => void;
  clearState: () => void;
}

export interface storeCartWithoutActions
  extends Omit<
    storeCartActionsAndState,
    | 'getProducts'
    | 'addProduct'
    | 'removeProduct'
    | 'calculateCartPrice'
    | 'clearState'
  > {}
