import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../const";

interface CartItem {
  productId: number;
  quantity: number;
  price: number;
  photoUrl: string;
  name: string;
}

interface CartResponse {
  accessKey?: string;
  items?: CartItem[];
}

interface AddItemPayload {
  productId: number;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  accessKey: string | null;
  error: string | null;
}

const initialState: CartState = {
  isOpen: false,
  items: [],
  status: 'idle',
  accessKey: null,
  error: null,
};

export const registerCart = createAsyncThunk<CartResponse>(
  'cart/registerCart',
  async () => {
    const response = await fetch(`${API_URL}/api/cart/register`, {
      method: 'POST',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Error registering cart');
    }
    return (await response.json()) as CartResponse;
  }
);

export const fetchCart = createAsyncThunk<CartItem[]>(
  'cart/fetchCart',
  async () => {
    const response = await fetch(`${API_URL}/api/cart`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error('Error fetching cart');
    }
    return (await response.json()) as CartItem[];
  }
);

export const addItemToCart = createAsyncThunk<CartItem[], AddItemPayload>(
  "cart/addItemToCart",
  async ({ productId, quantity }) => {
    const response = await fetch(`${API_URL}/api/cart/items`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity })
    });
    if (!response.ok) {
      throw new Error('Error adding item to cart');
    }
    return (await response.json()) as CartItem[];
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCart.pending, (state) => {
        state.status = "loading";
        state.accessKey = null;
      })
      .addCase(registerCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.status = "success";
        state.accessKey = action.payload.accessKey ?? null;
      })
      .addCase(registerCart.rejected, (state, action) => {
        state.status = "failed";
        state.accessKey = null;
        state.error = action.error.message || null;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  }
});

// Экспорт действий и редьюсера
export const { toggleCart } = cartSlice.actions;

// Селектор для получения общей стоимости корзины
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export type { CartState };
export default cartSlice.reducer;
