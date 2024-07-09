import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const";

export const fetchGoods = createAsyncThunk("goods/fetchGoods", async (params) => {
  const queryString = new URLSearchParams(params).toString();
  console.log(queryString);
  const response = await fetch(
    `${API_URL}/api/products${queryString ? `?${queryString}` : ""}`,
  );
  return await response.json();
})

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
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
      state.status = 'idle';
    },
    changePriceRange(state, action) {
      state.priceRange = action.payload;
      state.status = 'idle';
    },
    changeSearch(state, action) {
      state.search = action.payload;
      state.status = 'idle';
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { changeType, changePriceRange, changeSearch } = goodsSlice.actions;

export default goodsSlice.reducer;
