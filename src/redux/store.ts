import { configureStore } from "@reduxjs/toolkit";
import searchModelSlice from './slice/Search/searchModelSlice';
import SidebarSlice from './slice/Sidebar/SidebarSlice';
import userReducer from './slice/User/userSlice';
import authSlice from './slice/Auth/authSlice';
import otpSlice from './slice/Auth/otpSlice';
import topSlice from './slice/Tops/TopsSlice';
import mediaPlayerReducer from './slice/Player/mediaPlayerSlice';
import homeReducer from './slice/Home/homeSlice';
import playlistSlice from './slice/PlayList/createPlayList';
import favouriteSlice from './slice/Favourite/favouriteSlice';
import recentlyPlayedSlice from './slice/RecentlyPlayed/recentlyPlayedSlice';
import artistSlice from './slice/Artist/artistSlice';
import searchSlice from './slice/Search/searchSlice';
import languageSlice from './slice/language/languageSlice';
import languageMediaSlice from './slice/language/languageMediaSlice';
import playlistModelSlice from './slice/PlayList/playListModal';

export const store = configureStore({
  reducer: {
    searchModel: searchModelSlice,
    Sidebar: SidebarSlice,
    user: userReducer,
    auth: authSlice,
    otpVerify: otpSlice,
    topMedis: topSlice,
    mediaPlayer: mediaPlayerReducer,
    home: homeReducer,
    playList: playlistSlice,
    favourite: favouriteSlice,
    recentlyPlayed: recentlyPlayedSlice,
    artist: artistSlice,
    searchSong: searchSlice,
    languages: languageSlice,
    languageMedia: languageMediaSlice,
    playlistModal: playlistModelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;