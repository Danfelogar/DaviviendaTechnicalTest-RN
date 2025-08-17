import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from './types/mainNavigation';
import CartScreen from '../cart/CartScreen';
import ProductScreen from '../products/ProductScreen';

const Stack = createStackNavigator<MainStackParamList>();

export function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
