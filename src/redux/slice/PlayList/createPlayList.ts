import { get, post, remove } from "../../../utils/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AddSongResponse,
  Playlist,
  PlaylistData,
  PlaylistState,
} from "./types";
import { Alert } from "react-native";

export const createPlaylist = createAsyncThunk<
  Playlist,
  FormData,
  { rejectValue: string }
>("playlist/createPlaylist", async (formData, { rejectWithValue }) => {
  try {
    const response = await post({
      url: "playlist/create",
      data: formData,
      includeToken: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message || "An error occurred");
  }
});

export const addSongToPlaylist = createAsyncThunk<
  AddSongResponse,
  FormData,
  { rejectValue: string }
>("playlist/addSongToPlaylist", async (formData, { rejectWithValue }) => {
  try {
    const response = await post({
      url: "playlist/addsong",
      data: formData,
      includeToken: true,
    });
    if (response.code >= 200 && response.code < 300) {
      Alert.alert(response.messages[0]);
      return response;
    } else {
      Alert.alert(response.messages[0]);
    }
  } catch (error: any) {
  console.log(error);
  
    return rejectWithValue(error?.message || "An error occurred");
  }
});

export const removeSongFromPlaylist = createAsyncThunk<
  AddSongResponse,
  FormData,
  { rejectValue: string }
>("playlist/removeSongFromPlaylist", async (formData, { rejectWithValue }) => {
  try {
    const response = await post({
      url: "playlist/removemedia",
      data: formData,
      includeToken: true,
    });

    if (response.code >= 200 && response.code < 300) {
      Alert.alert(response.messages[0]);
      return response;
    } else {
      Alert.alert(response.messages[0]);
    }
  } catch (error: any) {
    return rejectWithValue(
      error?.message || "An error occurred while removing the song"
    );
  }
});

export const fetchPlaylists = createAsyncThunk<
  PlaylistData[],
  void,
  { rejectValue: string }
>("playlist/fetchPlaylists", async (_, { rejectWithValue }) => {
  try {
    const response = await get({
      url: "playlist/index",
      includeToken: true,
    });
    console.log("response==>", response);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.message || "An error occurred while fetching playlists"
    );
  }
});

export const fetchPlaylistDetails = createAsyncThunk<
  PlaylistData,
  number,
  { rejectValue: string }
>("playlist/fetchPlaylistDetails", async (playlistId, { rejectWithValue }) => {
  try {
    const response = await get({
      url: `playlist/view/${playlistId}`,
      includeToken: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.message || "Failed to fetch playlist details"
    );
  }
});

export const updatePlaylist = createAsyncThunk<
  Playlist,
  FormData,
  { rejectValue: string }
>("playlist/updatePlaylist", async (formData, { rejectWithValue }) => {
  try {
    const response = await post({
      url: "playlist/update?_method=patch",
      data: formData,
      includeToken: true,
    });
    Alert.alert("Playlist updated successfully");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message || "Failed to update playlist");
  }
});

const initialState: PlaylistState = {
  playlists: [],
  playlistDetails: null,
  loading: false,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createPlaylist.fulfilled,
        (state, action: PayloadAction<Playlist>) => {
          state.loading = false;
          state.playlists.push(action.payload);
        }
      )
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create playlist";
      })
      .addCase(addSongToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addSongToPlaylist.fulfilled,
        (state, action: PayloadAction<AddSongResponse>) => {
          state.loading = false;
          // You could update a specific playlist's song list here if needed
        }
      )
      .addCase(addSongToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add song to playlist";
      })
      .addCase(removeSongFromPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeSongFromPlaylist.fulfilled,
        (state, action: PayloadAction<AddSongResponse>) => {
          state.loading = false;
        }
      )
      .addCase(removeSongFromPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove song from playlist";
      })
      .addCase(fetchPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlaylists.fulfilled,
        (state, action: PayloadAction<PlaylistData[]>) => {
          state.loading = false;
          state.playlists = action.payload;
        }
      )
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch playlists";
      })
      // Fetch playlist details actions
      .addCase(fetchPlaylistDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlaylistDetails.fulfilled,
        (state, action: PayloadAction<PlaylistData>) => {
          state.loading = false;
          state.playlistDetails = action.payload;
        }
      )
      .addCase(fetchPlaylistDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch playlist details";
      })
      // Update playlist actions
      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePlaylist.fulfilled,
        (state, action: PayloadAction<Playlist>) => {
          state.loading = false;
          // Update the playlist name in the state
          const index = state.playlists.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.playlists[index] = {
              ...state.playlists[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(updatePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update playlist";
      });
  },
});

export default playlistSlice.reducer;
