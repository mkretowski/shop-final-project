import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './productsReducer';
import { ordersReducer } from './ordersReducer';
import { userReducer } from './userReducer';
import { viewportModeReducer } from './viewportModeReducer';
import { cartReducer } from './cartReducer';

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
    user: userReducer,
    viewportMode: viewportModeReducer,
  },
});

export default store;
