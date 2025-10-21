import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MediaItem } from "../Tops/TopsSlice";
import { get } from "../../../utils/axios";


interface RecentlyPlayedState {
    media: MediaItem[];
    currentPage: number;
    lastPage: number;
    total: number;
    resenlyListLoading: boolean;
    error: string | null;
}

const initialState: RecentlyPlayedState = {
    media: [],
    currentPage: 1,
    lastPage: 1,
    total: 0,
    resenlyListLoading: false,
    error: null,
};

export const fetchRecentlyPlayed = createAsyncThunk(
    "recentlyPlayed/fetch",
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await get({ url: `/recently-played/index?page=${page}`, includeToken: true });
            return response.data
        } catch (error) {
            return rejectWithValue("Failed to fetch recently played media");
        }
    }
);

// Create the slice
const recentlyPlayedSlice = createSlice({
    name: "recentlyPlayed",
    initialState,
    reducers: {
      clearRecentlyPlayed: (state) => {
        state.media = [];
        state.currentPage = 1;
        state.lastPage = 1;
        state.total = 0;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchRecentlyPlayed.pending, (state) => {
          state.resenlyListLoading = true;
          state.error = null;
        })
        .addCase(fetchRecentlyPlayed.fulfilled, (state, action) => {
          state.resenlyListLoading = false;
          state.media = action.payload.media;
          state.currentPage = action.payload.current_page;
          state.lastPage = action.payload.last_page;
          state.total = action.payload.total;
        })
        .addCase(fetchRecentlyPlayed.rejected, (state, action) => {
          state.resenlyListLoading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { clearRecentlyPlayed } = recentlyPlayedSlice.actions;
  
  export default recentlyPlayedSlice.reducer;