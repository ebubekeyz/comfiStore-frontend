import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const getOrderFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('order')) || null;
};

const initialState = {
  orderItems: getOrderFromLocalStorage(),
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const order = { ...action.payload };

      state.orderItems = order;
      localStorage.setItem('order', JSON.stringify(order));
    },
    clearCart: (state) => {
      state.orderItems = [];
      localStorage.removeItem('order');
      toast.success('Order removed');
    },
  },
});

export const { addItem } = orderSlice.actions;

export default orderSlice.reducer;
