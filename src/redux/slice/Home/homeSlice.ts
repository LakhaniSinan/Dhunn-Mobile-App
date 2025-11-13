import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {MediaItem} from '../Tops/TopsSlice';
import {get, post} from '../../../utils/axios';

export interface Artist {
  id: number;
  name: string;
  bio: string;
  image: string;
  is_favorite: boolean;
}
interface Pagination {
  currentPage: number;
  totalPages: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  perPage: number;
  totalItems: number;
}

interface HomeState {
  newRelease: MediaItem[];
  videoSongs: MediaItem[];
  trendingSongs: MediaItem[];
  topArtists: Artist[];
  pickYourMode: MediaItem[];

  media: MediaItem[];
  all_topArtists: Artist[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  newRelease: [],
  videoSongs: [],
  trendingSongs: [],
  topArtists: [],
  pickYourMode: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    nextPageUrl: null,
    prevPageUrl: null,
    perPage: 20,
    totalItems: 0,
  },
  media: [],
  all_topArtists: [],
  loading: false,
  error: null,
};

export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async () => {
    const response = await get({url: 'home'});
    return response.data;
  },
);

export const fetchMediaByType = createAsyncThunk(
  'home/fetchMediaByType',
  async ({
    type,
    page = 1,
    perPage = 20,
  }: {
    type: string;
    page?: number;
    perPage?: number;
  }) => {
    const response = await get({
      url: `media/content/bytype?type=${type}&page=${page}&per_page=${perPage}`,
    });
    return {data: response.data, type, page};
  },
);

export const toggleLike = createAsyncThunk(
  'home/toggleLike',
  async (mediaId: number) => {
    const response = await post({
      url: `media/${mediaId}/toggle-like`,
      includeToken: true,
    });
    return {mediaId, response: response.data};
  },
);

export const getMediaById = createAsyncThunk(
  'home/toggleLike',
  async (mediaId: number) => {
    const response = await get({url: `media/${mediaId}`, includeToken: true});
    return {mediaId, response: response.data};
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHomeData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action: PayloadAction<any>) => {
        const {
          new_release,
          video_song,
          trending_song,
          top_artists,
          pick_your_mode,
        } = action.payload;
        state.loading = false;
        state.newRelease = new_release;
        state.videoSongs = video_song;
        state.trendingSongs = trending_song;
        state.topArtists = top_artists;
        state.pickYourMode = pick_your_mode;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch home data';
      })
      .addCase(fetchMediaByType.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMediaByType.fulfilled, (state, action) => {
        state.loading = false;
        const {type, data, page} = action.payload;
        const {
          artist,
          media,
          current_page,
          last_page,
          next_page_url,
          prev_page_url,
          per_page,
          total,
        } = data;
        if (type === 'top_artists') {
          state.all_topArtists = artist;
        } else {
          state.media = media;
        }
        state.pagination = {
          currentPage: current_page,
          totalPages: last_page,
          nextPageUrl: next_page_url,
          prevPageUrl: prev_page_url,
          perPage: per_page,
          totalItems: total,
        };
      })
      .addCase(fetchMediaByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch home data';
      })
      .addCase(toggleLike.pending, state => {
        state.loading = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const {mediaId, response} = action.payload;
        if (response.code === 200) {
          const updateItem = (items: MediaItem[]) => {
            const item = items.find(media => media.id === mediaId);
            if (item) {
              item.favorite_count += item.favorite_count ? -1 : 1;
              item.is_favorite = !item.is_favorite;
            }
          };
          // Update across all categories
          updateItem(state.newRelease);
          updateItem(state.videoSongs);
          updateItem(state.trendingSongs);
          updateItem(state.pickYourMode);
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle like';
      });
  },
});

export default homeSlice.reducer;
