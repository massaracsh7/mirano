import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../const";

// Интерфейсы для данных
interface Product {
  id: number;
  name: string;
  price: number;
  categories: string[];
}

interface PriceRange {
  minPrice: string;
  maxPrice: string;
}

interface GoodsState {
  items: Product[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
  type: string;
  priceRange: PriceRange;
  search: string;
  categories: string[];
  category: string;
}

// Начальное состояние
const initialState: GoodsState = {
  items: [],
  status: 'idle',
  error: null,
  type: 'bouquets',
  priceRange: {
    minPrice: '',
    maxPrice: '',
  },
  search: '',
  categories: [],
  category: '',
};

// Асинхронное действие для получения товаров
export const fetchGoods = createAsyncThunk < Product[], Record<string, string>> (
  'goods/fetchGoods',
  async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_URL}/api/products${queryString ? `?${queryString}` : ""}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch goods');
    }
    return (await response.json()) as Product[];
  }
);

// Слайс состояния товаров
const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<string>) {
      state.type = action.payload;
      state.category = '';
      state.status = 'idle';
    },
    changePriceRange(state, action: PayloadAction<PriceRange>) {
      state.priceRange = action.payload;
      state.status = 'idle';
    },
    changeSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.status = 'idle';
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = "loading";
        state.categories = [];
      })
      .addCase(fetchGoods.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "success";
        state.items = action.payload;
        action.payload.forEach(product => {
          if (product.categories) {
            product.categories.forEach((category) => {
              if (!state.categories.includes(category)) {
                state.categories.push(category);
              }
            });
          }
        });
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

// Экспорт действий и редьюсера
export const { changeType, changePriceRange, changeSearch, changeCategory } = goodsSlice.actions;

export type { GoodsState };

export default goodsSlice.reducer;
