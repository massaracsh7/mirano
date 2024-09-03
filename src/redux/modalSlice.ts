import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleCart, fetchCart } from "./cartSlice";
import { API_URL } from "../const";

interface OrderData {
  buyerName: string;
  buyerPhone: string;
  recipientName: string;
  recipientPhone: string;
  street: string;
  house: string;
  apartment: string;
  paymentMethod: string;
  deliveryDate: string;
  deliveryTime: string;
}

interface ModalState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isModalOpen: boolean;
  orderId: string;
  data: OrderData;
  error?: string;
}

export const submitOrder = createAsyncThunk(
  'order/sendOrder',
  async (_, { getState, dispatch }) => {
    const state = getState() as { modal: { data: OrderData } };
    const {
      buyerName,
      buyerPhone,
      recipientName,
      recipientPhone,
      street,
      house,
      apartment,
      paymentMethod,
      deliveryDate,
      deliveryTime,
    } = state.modal.data;

    const orderData = {
      buyer: {
        name: buyerName,
        phone: buyerPhone,
      },
      recipient: {
        name: recipientName,
        phone: recipientPhone,
      },
      address: `${street}, ${house} ${apartment}`,
      paymentOnline: paymentMethod,
      deliveryDate,
      deliveryTime,
    };

    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to send order');
    }

    const result = await response.json();

    dispatch(clearOrder());
    dispatch(toggleCart());
    dispatch(fetchCart());
    return result;
  }
);

const initialState: ModalState = {
  status: 'idle',
  isModalOpen: false,
  orderId: '',
  data: {
    buyerName: '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',
    paymentMethod: 'true',
    deliveryDate: '',
    deliveryTime: '',
  }
};

// Слайс для модального окна
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
      if (!state.isModalOpen) {
        state.orderId = '';
      }
    },
    updateOrderData(state, action: PayloadAction<Partial<OrderData>>) {
      state.data = { ...state.data, ...action.payload };
    },
    clearOrder(state) {
      state.orderId = '';
      state.data = {
        buyerName: '',
        buyerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        apartment: '',
        paymentMethod: 'true',
        deliveryDate: '',
        deliveryTime: '',
      };
    },
    updateOrder(state, action: PayloadAction<{ orderId?: string; data: Partial<OrderData> }>) {
      state.orderId = action.payload.orderId || state.orderId;
      state.data = { ...state.data, ...action.payload.data };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
        state.orderId = '';
      })
      .addCase(submitOrder.fulfilled, (state, action: PayloadAction<{ orderId: string }>) => {
        state.status = 'succeeded';
        state.orderId = action.payload.orderId;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
        state.orderId = '';
      });
  },
});

export const {
  toggleModal,
  updateOrderData,
  clearOrder,
  updateOrder
} = modalSlice.actions;

export type { ModalState };

export default modalSlice.reducer;
