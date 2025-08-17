import { FC, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useStoreCart } from '../store/storeCart';
import { heightFullScreen, widthFullScreen } from '../shared/phoneDimensions';
import { ButtonGeneric } from '../shared/components/ButtonGeneric';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types/mainNavigation';
import { ProductItem } from './types/products';
import {
  ProductItemComponent,
  ProductItemMemo,
} from './compoments/ProductItem';

interface Props extends StackScreenProps<MainStackParamList, 'Product'> {}

const ProductScreen: FC<Props> = ({ navigation }) => {
  const { content } = styles;
  const getProducts = useStoreCart(state => state.getProducts);
  const products = useStoreCart(state => state.products);
  const addProduct = useStoreCart(state => state.addProduct);

  useEffect(() => {
    const getItems = async () => {
      await getProducts();
    };

    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddProduct = useCallback(
    (product: ProductItem) => {
      addProduct(product);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <View style={[content]}>
      <ButtonGeneric
        buttonStyle={{
          backgroundColor: '#6200ee',
          borderRadius: 8,
          height: widthFullScreen * 0.1,
          paddingVertical: 2,
        }}
        onPress={() => navigation.navigate('Cart')}
        textContent={<Text style={{ color: '#fff' }}>GO to Cart</Text>}
      />
      <FlatList
        data={products}
        renderItem={({ item }) => {
          console.log({ item });
          return (
            <View
              style={{
                width: widthFullScreen * 0.8,
                height: heightFullScreen * 0.1,
                flexDirection: 'row',
              }}
            >
              <View style={{ width: '79%', flexDirection: 'column' }}>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
                <Text>{item.image}</Text>
              </View>
              <ButtonGeneric
                buttonStyle={{
                  backgroundColor: '#6200ee',
                  borderRadius: 8,
                  height: '50%',
                  paddingVertical: 2,
                }}
                onPress={() => addProduct(item)}
                textContent={<Text style={{ color: '#fff' }}>add to cart</Text>}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
