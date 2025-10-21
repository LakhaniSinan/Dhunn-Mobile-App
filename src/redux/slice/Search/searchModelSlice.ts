import { createSlice } from '@reduxjs/toolkit';

interface SearchModelState {
  isOpen: boolean;
}

const initialState: SearchModelState = {
  isOpen: false,
};

const searchModelSlice = createSlice({
  name: 'searchModel',
  initialState,
  reducers: {
    openSearchModel(state) {
      state.isOpen = true;
    },
    closeSearchModel(state) {
      state.isOpen = false;
    },
  },
});

export const { openSearchModel, closeSearchModel } = searchModelSlice.actions;
export default searchModelSlice.reducer;