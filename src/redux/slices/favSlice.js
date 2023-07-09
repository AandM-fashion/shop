import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const favSlice = createSlice({
  name: "fav",
  initialState: {
    favItems: [],
    totalAmount: 0,
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.favItems.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.favItems.push(newItem);
        state.totalAmount += newItem.price;
        state.totalQuantity++;
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.favItems.find((item) => item.id === itemId);

      if (existingItem) {
        state.totalAmount -= existingItem.price;
        state.totalQuantity--;
        state.favItems = state.favItems.filter((item) => item.id !== itemId);
      }
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.favItems.find((item) => item.id === itemId);

      if (existingItem) {
        state.totalAmount -= existingItem.price;
        state.totalQuantity--;
        state.favItems = state.favItems.filter((item) => item.id !== itemId);
      }
    },
  },
});

export const favActions = favSlice.actions;

export default favSlice.reducer;
