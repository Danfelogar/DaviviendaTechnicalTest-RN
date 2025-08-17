import { FC, memo } from 'react';
import { ProductItem } from '../types/products';
import { Text, View } from 'react-native';
import { ButtonGeneric } from '../../shared/components/ButtonGeneric';
import {
  heightFullScreen,
  widthFullScreen,
} from '../../shared/phoneDimensions';

export const ProductItemComponent: FC<{
  item: ProductItem;
  onAdd: (item: ProductItem) => void;
}> = ({ item, onAdd }) => {
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
        onPress={() => onAdd(item)}
        textContent={<Text style={{ color: '#fff' }}>add to cart</Text>}
      />
    </View>
  );
};

export const ProductItemMemo: FC<{
  item: ProductItem;
  onAdd: (item: ProductItem) => void;
}> = memo(({ item, onAdd }) => {
  console.log('render ProductItemMemo', item.id);
  return <ProductItemComponent item={item} onAdd={onAdd} />;
});
