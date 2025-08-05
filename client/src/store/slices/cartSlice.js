import { createSlice } from '@reduxjs/toolkit';

// Get cart from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
  cartItems,
  totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
  totalPrice: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(item => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity,
          countInStock: product.stock,
        });
      }

      // Update totals
      state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== productId);

      // Update totals
      state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find(item => item._id === productId);

      if (item) {
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter(item => item._id !== productId);
        } else {
          item.quantity = Math.min(quantity, item.countInStock);
        }

        // Update totals
        state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
    },

    updateCartFromStorage: (state) => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      state.cartItems = cartItems;
      state.totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  updateCartFromStorage,
  saveShippingAddress
} = cartSlice.actions;

export default cartSlice.reducer; 