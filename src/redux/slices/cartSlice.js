import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []
const totalAmount = localStorage.getItem('totalAmount') !== null ? JSON.parse(localStorage.getItem('totalAmount')) : 0
const totalQuantity = localStorage.getItem('totalQuantity') !== null ? JSON.parse(localStorage.getItem('totalQuantity')) : 0

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: items,
    totalAmount: totalAmount,
    totalQuantity: totalQuantity,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);

      if (existingItemIndex === -1) {
        state.cartItems.push({ ...newItem, quantity: 1 });
      } else {
        state.cartItems[existingItemIndex].quantity++;
      }

      state.totalAmount += Number(newItem.price); // Convert price to number
      state.totalQuantity++;

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === itemId);

      if (existingItemIndex !== -1) {
        if (state.cartItems[existingItemIndex].quantity === 1) {
          state.cartItems.splice(existingItemIndex, 1);
        } else {
          state.cartItems[existingItemIndex].quantity--;
        }

        state.totalAmount -= Number(state.cartItems[existingItemIndex].price); // Convert price to number
        state.totalQuantity--;
      }

      if (state.cartItems.length === 0) {
        state.totalAmount = 0;
        state.totalQuantity = 0;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === itemId);

      if (existingItemIndex !== -1) {
        const { price, quantity } = state.cartItems[existingItemIndex];
        const itemPrice = Number(price); // Convert price to number
        const totalPrice = itemPrice * quantity;
        state.totalAmount -= totalPrice;
        state.totalQuantity -= quantity;
        state.cartItems.splice(existingItemIndex, 1);
      }

      if (state.cartItems.length === 0) {
        state.totalAmount = 0;
        state.totalQuantity = 0;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === itemId);

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity++;
        state.totalAmount += Number(state.cartItems[existingItemIndex].price); // Convert price to number
        state.totalQuantity++;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === itemId);

      if (existingItemIndex !== -1) {
        if (state.cartItems[existingItemIndex].quantity === 1) {
          // If quantity is one, do not decrement or delete the item
          return;
        }

        state.cartItems[existingItemIndex].quantity--;
        state.totalAmount -= Number(state.cartItems[existingItemIndex].price); // Convert price to number
        state.totalQuantity--;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;

      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalAmount');
      localStorage.removeItem('totalQuantity');
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
