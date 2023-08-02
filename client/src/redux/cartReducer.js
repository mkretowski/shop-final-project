import { createSlice } from '@reduxjs/toolkit';

//selectors
export const getAll = ({ cart }) => cart.products;
export const getCount = ({ cart }) => cart.products.length;

//actions
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addCartProduct(state, action) {
      if (
        state.products.find(
          (product) =>
            product.productId === action.payload.productId &&
            product.size === action.payload.size,
        )
      ) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.productId === action.payload.productId &&
            product.size === action.payload.size
              ? {
                  ...product,
                  quantity: product.quantity + action.payload.quantity,
                }
              : product,
          ),
        };
      } else {
        return {
          ...state,
          products: [...state.products, { ...action.payload }],
        };
      }
    },
    updateCartProduct(state, action) {
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId === action.payload.productId &&
          product.size === action.payload.size
            ? {
                ...product,
                quantity: action.payload.quantity,
              }
            : product,
        ),
      };
    },
    removeCartProduct(state, action) {
      const { productId, size } = action.payload;

      state.products = state.products.filter(
        (product) => product.productId !== productId || product.size !== size,
      );
    },
    clearCart(state) {
      state.products = [];
    },
  },
});

export const {
  addCartProduct,
  updateCartProduct,
  removeCartProduct,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
