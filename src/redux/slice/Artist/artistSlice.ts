import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "../Home/homeSlice";

import { MediaItem } from "../Tops/TopsSlice";
import { get } from "../../../utils/axios";

interface GroupedArtists {
    [key: string]: Artist[];
}
interface ArtistDetails {
    id: number;
    name: string;
    bio: string;
    image: string;
    is_favorite: boolean;
    media: MediaItem[]; 
}
interface ArtistState {
    groupedArtists: GroupedArtists;
    topArtists: Artist[];
    loading: boolean;
    error: string | null;
    artistDetails: ArtistDetails | null; // State for artist details
    loadingArtistDetails: boolean; // State for loading artist details
    errorArtistDetails: string | null; // Error state for artist details
}

export const fetchArtists = createAsyncThunk<
    { grouped_artists: GroupedArtists; top_artists: Artist[] },
    void,
    { rejectValue: string }
>("artists/fetchArtists", async (_, { rejectWithValue }) => {
    try {
        const response = await get({
            url: "artist/index",
            includeToken: true,
        });
        return {
            grouped_artists: response.data,
            top_artists: response.data.top_artists || [],
        };
    } catch (error: any) {
        return rejectWithValue(error?.message || "Failed to fetch artists");
    }
});


export const fetchArtistDetails = createAsyncThunk<
    ArtistDetails,
    number,
    { rejectValue: string }
>("artists/fetchArtistDetails", async (artistId, { rejectWithValue }) => {
    try {
        const response = await get({
            url: `artist/media/${artistId}`,
            includeToken: true,
        });
        return response.data
    } catch (error: any) {
        return rejectWithValue(error?.message || "Failed to fetch artist details");
    }
});


const initialState: ArtistState = {
    groupedArtists: {},
    topArtists: [],
    loading: false,
    error: null,
    artistDetails: null,
    loadingArtistDetails: false,
    errorArtistDetails: null,
};

const artistSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchArtists.fulfilled,
                (state, action: PayloadAction<{ grouped_artists: GroupedArtists; top_artists: Artist[] }>) => {
                    state.loading = false;
                    state.groupedArtists = action.payload.grouped_artists;
                    state.topArtists = action.payload.top_artists;
                }
            )
            .addCase(fetchArtists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch artists";
            })
            .addCase(fetchArtistDetails.pending, (state) => {
                state.loadingArtistDetails = true;
                state.errorArtistDetails = null;
            })
            .addCase(fetchArtistDetails.fulfilled, (state, action: PayloadAction<ArtistDetails>) => {
                state.loadingArtistDetails = false;
                state.artistDetails = action.payload
            })
            .addCase(fetchArtistDetails.rejected, (state, action) => {
                state.loadingArtistDetails = false;
                state.errorArtistDetails = action.payload || "Failed to fetch artist details";
            });
    },
});

export default artistSlice.reducer;