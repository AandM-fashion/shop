import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import favSlice from "./slices/favSlice";

const store = configureStore({
    reducer:{
        cart: cartSlice,
        fav: favSlice,
    },
})

export default store;
