import { API_URL } from '../config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//selectors
export const getAllOrders = (state) => {
  return state.orders.data ? state.orders.data : [];
};
export const getOrderById = ({ orders }, orderId) =>
  orders.data.find((order) => order._id === orderId);
export const getOrdersByUser = ({ orders }, userId) =>
  orders.data.filter((order) => order.userId === userId);

//actions
export const addOrderRequest = createAsyncThunk(
  'orders/addOrderRequest',
  async (newOrder) => {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    };

    const response = await fetch(API_URL + '/orders', options);
    if (!response.ok) {
      throw new Error('Failed to add order.');
    }
    return response.status;
  },
);

export const removeOrderRequest = createAsyncThunk(
  'orders/removeOrderRequest',
  async (order) => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(API_URL + '/orders/' + order, options);
    if (!response.ok) {
      throw new Error('Failed to remove order.');
    }
    return response.status;
  },
);

export const fetchOrdersByUser = createAsyncThunk(
  'orders/fetchOrders',
  async (userId) => {
    const options = {
      method: 'GET',
      credentials: 'include',
    };

    const response = await fetch(API_URL + '/orders/user/' + userId, options);
    if (response.status === 200) {
      const orders = await response.json();
      return orders;
    } else {
      return null;
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    status: 'loading',
  },
  reducers: {
    removeOrder(state, action) {
      const orderId = action.payload;
      state.data = state.data.filter((order) => order.id !== orderId);
    },
    setActionStatus(state, action) {
      state.actionStatus = action.payload;
    },
    resetActionStatus(state) {
      state.actionStatus = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        return { ...state, status: 'loading' };
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          status: 'idle',
        };
      })
      .addCase(fetchOrdersByUser.rejected, (state) => {
        return { ...state, status: 'idle' };
      });
  },
});

export const { removeOrder, setActionStatus, resetActionStatus } =
  ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
