import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const";

export const fetchGoods = createAsyncThunk("goods/fetchGoods", async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `${API_URL}/api/products${queryString ? `?${queryString}` : ""}`,
  );
  return await response.json();
});

const initialState = {
  items: [],
  status: "idle",
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

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
      state.category = '';
      state.status = 'idle';
    },
    changePriceRange(state, action) {
      state.priceRange = action.payload;
      state.status = 'idle';
    },
    changeSearch(state, action) {
      state.search = action.payload;
      state.status = 'idle';
    },
    changeCategory(state, action) {
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
      .addCase(fetchGoods.fulfilled, (state, action) => {
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
        state.error = action.error.message;
      });
  },
});

export const { changeType, changePriceRange, changeSearch, changeCategory } = goodsSlice.actions;

export default goodsSlice.reducer;
