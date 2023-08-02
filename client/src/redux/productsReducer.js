import { API_URL } from '../config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//selectors
export const getAllProducts = (state) => {
  return state.products.data ? state.products.data : [];
};
export const getStatus = (state) => {
  return state.products ? state.products : state;
};
export const getProductById = ({ products }, productId) =>
  products.data.find((product) => product.id === productId);
export const getProductsByUser = ({ products }, userId) =>
  products.data.filter((product) => product.userId === userId);
export const getProductActionStatus = (state) => {
  return state.products.actionStatus;
};

//actions
export const addProductRequest = createAsyncThunk(
  'products/addProductRequest',
  async (newProduct) => {
    const fd = new FormData();
    fd.append('title', newProduct.title);
    fd.append('price', newProduct.price);
    fd.append('localisation', newProduct.localisation);
    fd.append('image', newProduct.image);
    fd.append('content', newProduct.content);

    const options = {
      method: 'POST',
      credentials: 'include',
      body: fd,
    };

    const response = await fetch(API_URL + '/products', options);
    if (!response.ok) {
      throw new Error('Failed to add product.');
    }
    return response.status;
  },
);

export const removeProductRequest = createAsyncThunk(
  'products/removeProductRequest',
  async (product) => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(API_URL + '/products/' + product, options);
    if (!response.ok) {
      throw new Error('Failed to remove product.');
    }
    return response.status;
  },
);

export const updateProductRequest = createAsyncThunk(
  'products/addProductRequest',
  async (newProperties) => {
    const fd = new FormData();
    if (newProperties.title) {
      fd.append('title', newProperties.title);
    }

    if (newProperties.price) {
      fd.append('price', newProperties.price);
    }

    if (newProperties.localisation) {
      fd.append('localisation', newProperties.localisation);
    }

    if (newProperties.image) {
      fd.append('image', newProperties.image);
    }

    if (newProperties.content) {
      fd.append('content', newProperties.content);
    }

    const options = {
      method: 'PUT',
      credentials: 'include',
      body: fd,
    };

    const response = await fetch(
      API_URL + '/products/' + newProperties.id,
      options,
    );
    if (!response.ok) {
      throw new Error('Failed to update product.');
    }
    return response.status;
  },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(API_URL + '/products');
    const products = await response.json();
    return products;
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const response = await fetch(API_URL + /products/ + productId);
    const product = await response.json();
    return product;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: 'loading',
    actionStatus: null,
  },
  reducers: {
    removeProduct(state, action) {
      const productId = action.payload;
      state.data = state.data.filter((product) => product._id !== productId);
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
      .addCase(fetchProducts.pending, (state) => {
        return { ...state, status: 'loading' };
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
          status: 'idle',
        };
      })
      .addCase(fetchProducts.rejected, (state) => {
        return { ...state, status: 'idle' };
      });
  },
});

export const { removeProduct, setActionStatus, resetActionStatus } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
