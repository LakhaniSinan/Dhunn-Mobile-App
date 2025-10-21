
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem } from '../Tops/TopsSlice';
import { get } from '../../../utils/axios';


interface LanguageMediaState {
    id: number | null;
    name: string | null;
    audio: MediaItem[];
    movie: MediaItem[];
    video: MediaItem[];
    loading: boolean;
    error: string | null;
}

const initialState: LanguageMediaState = {
    id: null,
    name: null,
    audio: [],
    movie: [],
    video: [],
    loading: false,
    error: null,
};

export const fetchLanguageMedia = createAsyncThunk(
    'languageMedia/fetchLanguageMedia',
    async (languageId: string, { rejectWithValue }) => {
        try {
            console.log("response LANG=>", languageId);
            const response = await get({ url: `language/media/${languageId}`, includeToken: true });

            const data = response.data
            return data;
        } catch (error) {
            return rejectWithValue("Failed to fetch language media");
        }
    }
);

const languageMediaSlice = createSlice({
    name: 'languageMedia',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguageMedia.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLanguageMedia.fulfilled, (state, action: PayloadAction<any>) => {
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.audio = action.payload.media.audio;
                state.movie = action.payload.media.movie;
                state.video = action.payload.media.video;
                state.loading = false;
            })
            .addCase(fetchLanguageMedia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default languageMediaSlice.reducer;
