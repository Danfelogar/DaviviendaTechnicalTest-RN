import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  storeCartActionsAndState,
  storeCartWithoutActions,
} from './types/storeCart';
import { getProducts } from '../products/services/api';
import { ProductItem } from '../products/types/products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateCartPrice } from '../shared/calculateCartPrice';

const INITIAL_STATE: storeCartWithoutActions = {
  products: [],
  cart: [],
  totalPriceProduct: 0,
  counterProduct: 0,
};

export const useStoreCart = create<storeCartActionsAndState>()(
  persist(
    (set, get) => ({
      //sate
      ...INITIAL_STATE,
      //functions
      getProducts: async () => {
        try {
          const response = await getProducts();
          set({ products: response });
          return response;
        } catch (error) {
          set({ products: [] });
          console.error('Error fetching products:', error);
          throw error;
        }
      },
      addProduct: (product: ProductItem) => {
        const { cart } = get();
        const newCart = [...cart, product];
        set({
          cart: newCart,
          counterProduct: newCart.length,
          totalPriceProduct:
            Math.round(calculateCartPrice(newCart) * 100) / 100,
        });
      },
      removeProduct: (id: string) => {
        const { cart } = get();
        const newCart = cart.filter(item => item.id !== id);
        set({
          cart: newCart,
          counterProduct: newCart.length,
          totalPriceProduct:
            Math.round(calculateCartPrice(newCart) * 100) / 100,
        });
      },
      clearState: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: 'storeCart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
