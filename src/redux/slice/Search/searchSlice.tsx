import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MediaItem } from '../Tops/TopsSlice';
import { get } from '../../../utils/axios';



interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface SearchState {
  results: MediaItem[];
  query: string;
  loading: boolean;
  pagination: Pagination;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  query: '',
  loading: false,
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  },
  error: null,
};

// Async thunk for searching
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await get({
        url:`/search?q=${query}&page=${page}`,
      });
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch search results.');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetSearch: (state) => {
      state.results = [];
      state.query = '';
      state.pagination = initialState.pagination;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
