import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useStoreCart } from '../store/storeCart';
import { ButtonGeneric } from '../shared/components/ButtonGeneric';
import { widthFullScreen } from '../shared/phoneDimensions';

const CartScreen = () => {
  const { cart, totalPriceProduct, counterProduct, removeProduct } =
    useStoreCart();

  return (
    <View style={styles.content}>
      <Text>products: {counterProduct}</Text>
      <Text> total price products: {totalPriceProduct}</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <ButtonGeneric
              buttonStyle={{
                backgroundColor: '#6200ee',
                borderRadius: 8,
                height: widthFullScreen * 0.1,
                paddingVertical: 2,
              }}
              onPress={() => removeProduct(item.id)}
              textContent={<Text style={{ color: '#fff' }}>Remove</Text>}
            />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
