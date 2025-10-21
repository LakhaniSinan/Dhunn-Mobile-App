import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem } from '../Tops/TopsSlice';
import { get } from '../../../utils/axios';


interface FavouriteState {
    messages: string[];
    error: string | null;
    loading: boolean;
    favoriteSongs: MediaItem[];
}

const initialState: FavouriteState = {
    messages: [],
    error: null,
    loading: false,
    favoriteSongs: [],
};

export const fetchFavoriteSongs = createAsyncThunk(
    'favourite/fetchFavoriteSongs',
    async () => {
        const response = await get({
            url: 'favouritesong/favorite-songs',
            includeToken: true,
        });
        return response.data;
    }
);

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteSongs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoriteSongs.fulfilled, (state, action: PayloadAction<MediaItem[]>) => {
                state.loading = false;
                state.favoriteSongs = action.payload;
            })
            .addCase(fetchFavoriteSongs.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload ? action.payload.join(', ') : null;
            })
    },
});

export default favouriteSlice.reducer;