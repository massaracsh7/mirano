import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import modalReducer from './modalSlice';
import goodsReducer from './goodsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    goods: goodsReducer,
  },
});

export default store;
