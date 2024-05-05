import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import orderReducer from './features/order/orderSlice';
export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    orderState: orderReducer,
  },
});
