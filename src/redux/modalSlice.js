import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
