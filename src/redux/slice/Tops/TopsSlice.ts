import {get} from '../../../utils/axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Artist} from '../Home/homeSlice';

export interface MediaItem {
  id: number;
  title: string;
  description: string;
  type: string;
  duration: string;
  file_path: string;
  cover_image: string;
  release_date: string;
  recently_played_count: number;
  favorite_count: number;
  is_favorite: boolean;
  artist: Artist;
  category: {
    id: number;
    name: string;
  };
  racket_label: {
    id: number;
    name: string;
    phone: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
  } | null;
  language: {
    id: number;
    name: string;
  };
  is_playlist: {
    id: number;
    media_id: number;
    playlist_id: number;
    created_at: string;
    updated_at: string;
  };
}

interface MediaState {
  audio: MediaItem[];
  video: MediaItem[];
  movie: MediaItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MediaState = {
  audio: [],
  video: [],
  movie: [],
  loading: false,
  error: null,
};

export const fetchTopMedia = createAsyncThunk(
  'media/fetchTopMedia',
  async () => {
    const response = await get({url: 'top/media'});
    return response.data;
  },
);

const topSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopMedia.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopMedia.fulfilled, (state, action) => {
        const {audio, video, movie} = action.payload;
        state.audio = audio;
        state.video = video;
        state.movie = movie;
        state.loading = false;
      })
      .addCase(fetchTopMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch top media';
      });
  },
});

export default topSlice.reducer;
