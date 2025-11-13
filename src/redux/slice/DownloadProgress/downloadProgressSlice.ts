import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProgressDetails {
  isDownloading: boolean;
  progress: number;
}

interface ProgressState {
  downloadProgress: ProgressDetails | null;
}

const initialState: ProgressState = {
  downloadProgress: null,
};

const downloadProgressSlice = createSlice({
  name: 'downloadProgress',
  initialState,
  reducers: {
    setDownloadProgress: (
      state,
      action: PayloadAction<ProgressDetails | null>,
    ) => {
      state.downloadProgress = action.payload;
    },
  },
});

export const {setDownloadProgress} = downloadProgressSlice.actions;

export default downloadProgressSlice.reducer;
