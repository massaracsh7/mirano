import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleCart, fetchCart } from "./cartSlice";
import { API_URL } from "../const";

export const submitOrder = createAsyncThunk(
  "order/sendOrder",
  async (_, { getState, dispatch }) => {
    const {
      modal: {
        data: {
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
        },
      },
    } = getState();

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

const initialState = {
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
    paymentMethod: true,
    deliveryDate: '',
    deliveryTime: '',
  }
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    updateOrderData(state, action) {
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
        paymentMethod: true,
        deliveryDate: '',
        deliveryTime: '',
      };
    },
    updateOrder(state, action) {
      state.orderId = action.payload.orderId || state.orderId;
      state.data = { ...state.data, ...action.payload.data };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderId = action.payload.orderId;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  toggleModal,
  updateOrderData,
  clearOrder,
  updateOrder
} = modalSlice.actions;

export default modalSlice.reducer;
