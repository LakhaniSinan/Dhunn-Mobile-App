import { get } from '../../../utils/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Language {
    id: number;
    name: string;
}

interface LanguageState {
    languages: Language[];
    loading: boolean;
    error: string | null;
}

const initialState: LanguageState = {
    languages: [],
    loading: false,
    error: null,
};

export const fetchLanguages = createAsyncThunk(
    'language/fetchLanguages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get({ url: 'language/index', includeToken: true })
            const data = response.data
            return data as Language[];
        } catch (error) {
            return rejectWithValue("Failed to fetch languages");
        }
    }
);

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLanguages.fulfilled, (state, action: PayloadAction<Language[]>) => {
                state.languages = action.payload;
                state.loading = false;
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default languageSlice.reducer;
