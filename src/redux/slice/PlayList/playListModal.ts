import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaylistModelState {
  isOpen: boolean;
  media_id: number;
  is_playlist: boolean;
}

const initialState: PlaylistModelState = {
  isOpen: false,
  media_id: 0,
  is_playlist: false,
};

const playlistModelSlice = createSlice({
  name: "playlistModel",
  initialState,
  reducers: {
    openPlaylistModel(state, action: PayloadAction<{ media_id: number; is_playlist: boolean }>) {
      state.isOpen = true;
      state.media_id = action.payload.media_id;
      state.is_playlist = action.payload.is_playlist
    },
    closePlaylistModel(state) {
      state.isOpen = false;
      state.media_id = 0;
      state.is_playlist= false // Reset media_id when modal is closed
    },
  },
});

export const { openPlaylistModel, closePlaylistModel } =
  playlistModelSlice.actions;
export default playlistModelSlice.reducer;
