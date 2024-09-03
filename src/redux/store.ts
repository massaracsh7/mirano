
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from './cartSlice';
import modalReducer, { ModalState } from './modalSlice';
import goodsReducer, { GoodsState } from './goodsSlice';

export interface RootState {
  cart: CartState;
  modal: ModalState;
  goods: GoodsState;
}

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    goods: goodsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
