import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MediaItem} from '../Tops/TopsSlice';
import {get, post} from '../../../utils/axios';
import {fetchFavoriteSongs} from '../Favourite/favouriteSlice';
import store from '../../store';
interface MediaState {
  currentTrack: MediaItem;
  isPlaying: boolean;
  volume: number;
  mute: boolean;
  queue: MediaItem[];
  media_duration: string;
  currentTime: number;
  loading: boolean;
  error: string | null;
  isShuffled: boolean;
  repeatMode: 'off' | 'one' | 'all';
}

const initialState: MediaState = {
  currentTrack: {
    id: 0,
    title: '',
    description: '',
    type: '',
    duration: '',
    file_path: '',
    cover_image: '',
    release_date: '',
    recently_played_count: 0,
    favorite_count: 0,
    is_favorite: false,
    artist: {
      bio: '',
      name: '',
      id: 0,
      image: '',
      is_favorite: false,
    },
    category: {
      id: 0,
      name: '',
    },
    racket_label: null,
    language: {
      id: 0,
      name: '',
    },
    is_playlist: {
      created_at: '',
      id: 0,
      media_id: 0,
      playlist_id: 0,
      updated_at: '',
    },
  },
  media_duration: '',
  isPlaying: false,
  volume: 50,
  mute: false,
  queue: [],
  currentTime: 0,
  loading: false,
  error: null,
  isShuffled: false,
  repeatMode: 'off',
};
export const toggleLike = createAsyncThunk(
  'mediaPlayer/toggleLike',
  async (mediaId: number) => {
    const response = await post({
      url: `media/${mediaId}/toggle-like`,
      includeToken: true,
    });
    return {mediaId, success: response.code === 200};
  },
);

export const addFavourite = createAsyncThunk(
  'favourite/toggleFavorite',
  async ({mediaId, type}: {mediaId: number; type: string}) => {
    const response = await get({
      url: `favorites/${mediaId}/${type}`,
      includeToken: true,
    });
    store.dispatch(fetchFavoriteSongs());
    return {mediaId, success: response.code === 200};
  },
);
export const removeFavourite = createAsyncThunk(
  'favourite/removeFavourite',
  async ({mediaId, type}: {mediaId: number; type: string}) => {
    const response = await get({
      url: `favorites/remove/${mediaId}/${type}`,
      includeToken: true,
    });
    store.dispatch(fetchFavoriteSongs());
    return {mediaId, success: response.code === 200};
  },
);

// Shuffle the queue
const shuffleQueue = (
  queue: MediaItem[],
  currentTrack: MediaItem,
): MediaItem[] => {
  const shuffledQueue = [...queue].filter(
    track => track.id !== currentTrack.id,
  );
  for (let i = shuffledQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]];
  }
  return [currentTrack, ...shuffledQueue];
};

const mediaPlayerSlice = createSlice({
  name: 'mediaPlayer',
  initialState,
  reducers: {
    playTrack: (state, action: PayloadAction<any>) => {
      state.currentTrack = action.payload;
      state.media_duration = action.payload.duration;
      state.currentTime = 0; // Reset currentTime to 0 when playing a new track
      state.isPlaying = true;
    },
    clearTrack: state => {
      state.currentTrack = {
        id: 0,
        title: '',
        description: '',
        type: '',
        duration: '',
        file_path: '',
        cover_image: '',
        release_date: '',
        recently_played_count: 0,
        favorite_count: 0,
        is_favorite: false,
        artist: {
          bio: '',
          name: '',
          id: 0,
          image: '',
          is_favorite: false,
        },
        category: {
          id: 0,
          name: '',
        },
        racket_label: null,
        language: {
          id: 0,
          name: '',
        },
        is_playlist: {
          created_at: '',
          id: 0,
          media_id: 0,
          playlist_id: 0,
          updated_at: '',
        },
      };
      state.media_duration = '';
      state.currentTime = 0; // Reset currentTime to 0 when playing a new track
      state.isPlaying = false;
    },
    pauseTrack: state => {
      state.isPlaying = false;
    },
    togglePlayPause: state => {
      state.isPlaying = !state.isPlaying;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setDuration: (state, action) => {
      state.media_duration = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    toggleMute: state => {
      state.mute = !state.mute;
    },
    addToQueue: (state, action: PayloadAction<any>) => {
      state.queue.push(action.payload);
    },
    addQueueList: (state, action: PayloadAction<any>) => {
      state.queue = action.payload;
    },
    removeFromQueue: (state, action: PayloadAction<number>) => {
      state.queue = state.queue.filter(track => track.id !== action.payload);
    },
    clearQueue: state => {
      state.queue = [];
    },
    playNext: state => {
      const currentIndex = state.queue.findIndex(
        track => track.id === state.currentTrack.id,
      );
      // if (currentIndex >= 0 && currentIndex < state.queue.length - 1) {
      //   state.currentTrack = state.queue[currentIndex + 1];
      //   state.currentTime = 0; // Reset currentTime to 0 when playing the next track
      // }
      if (state.repeatMode === 'one') {
        // Repeat current track
        state.currentTime = 0;
      } else if (state.isShuffled) {
        // Play random track in shuffle mode
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.currentTrack = state.queue[randomIndex];
        state.currentTime = 0;
      } else if (currentIndex >= 0 && currentIndex < state.queue.length - 1) {
        // Play next track
        state.currentTrack = state.queue[currentIndex + 1];
        state.currentTime = 0;
      } else if (state.repeatMode === 'all') {
        // Loop back to start if repeat mode is all
        state.currentTrack = state.queue[0];
        state.currentTime = 0;
      } else {
        // End playback
        state.isPlaying = false;
      }
    },
    playPrevious: state => {
      const currentIndex = state.queue.findIndex(
        track => track.id === state.currentTrack.id,
      );
      if (currentIndex > 0) {
        state.currentTime = 0;
        state.currentTrack = state.queue[currentIndex - 1];
        state.isPlaying = true; // Optionally start playing
      }
    },
    toggleShuffle: state => {
      state.isShuffled = !state.isShuffled;
      state.queue = state.isShuffled
        ? shuffleQueue(state.queue, state.currentTrack)
        : state.queue; // Unshuffling can be handled by preserving the original order.
    },
    cycleRepeatMode: state => {
      if (state.repeatMode === 'off') state.repeatMode = 'one';
      else if (state.repeatMode === 'one') state.repeatMode = 'all';
      else state.repeatMode = 'off';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(toggleLike.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const {mediaId, success} = action.payload;
        if (success && state.currentTrack.id === mediaId) {
          state.currentTrack.is_favorite = !state.currentTrack.is_favorite;
          state.currentTrack.favorite_count += state.currentTrack.favorite_count
            ? 1
            : -1;
        }

        const songInQueue = state.queue.find(track => track.id === mediaId);
        if (songInQueue) {
          songInQueue.is_favorite = !songInQueue.is_favorite;
          songInQueue.favorite_count += songInQueue.is_favorite ? 1 : -1;
        }

        state.loading = false;
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle like';
      })
      // favorite add
      .addCase(addFavourite.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        const {mediaId, success} = action.payload;
        if (success && state.currentTrack.id === mediaId) {
          state.currentTrack.is_favorite = !state.currentTrack.is_favorite;
          state.currentTrack.favorite_count += state.currentTrack.favorite_count
            ? 1
            : -1;
        }

        const songInQueue = state.queue.find(track => track.id === mediaId);
        if (songInQueue) {
          songInQueue.is_favorite = !songInQueue.is_favorite;
          songInQueue.favorite_count += songInQueue.is_favorite ? 1 : -1;
        }

        state.loading = false;
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle like';
      })
      // favorite add
      .addCase(removeFavourite.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        const {mediaId, success} = action.payload;
        if (success && state.currentTrack.id === mediaId) {
          state.currentTrack.is_favorite = !state.currentTrack.is_favorite;
          state.currentTrack.favorite_count += state.currentTrack.favorite_count
            ? 1
            : -1;
        }

        const songInQueue = state.queue.find(track => track.id === mediaId);
        if (songInQueue) {
          songInQueue.is_favorite = !songInQueue.is_favorite;
          songInQueue.favorite_count += songInQueue.is_favorite ? 1 : -1;
        }

        state.loading = false;
      })
      .addCase(removeFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle like';
      });
  },
});

export const {
  playTrack,
  pauseTrack,
  togglePlayPause,
  setVolume,
  toggleMute,
  addToQueue,
  addQueueList,
  removeFromQueue,
  clearQueue,
  setDuration,
  setCurrentTime,
  playNext,
  playPrevious,
  toggleShuffle,
  cycleRepeatMode,
  clearTrack,
} = mediaPlayerSlice.actions;

export default mediaPlayerSlice.reducer;
