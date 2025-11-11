import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Header, Typography} from '../../components/atoms';
import {
  COLORS,
  IMAGES,
  parseDuration,
  screenHeight,
  SCREENS,
  screenWidth,
} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import TabList from '../HomeScreens/TabList';
import {AudioScreen} from '../../components/molucule/AudioScreen';
import {VideoScreen} from '../../components/molucule/VideoScreen';
import {FooterItem} from '../../components/atoms/FooterItem';
import {navigate, toggleDrawer} from '../../navigation/RootNavigation';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlaylists} from '../../redux/slice/PlayList/createPlayList';
import {fetchFavoriteSongs} from '../../redux/slice/Favourite/favouriteSlice';
import {fetchRecentlyPlayed} from '../../redux/slice/RecentlyPlayed/recentlyPlayedSlice';
import PlayListContent from '../../components/molucule/PlayListContent';
import SongGrid from '../../components/atoms/SongGrid';
import TrackPlayer from 'react-native-track-player';
import {MediaItem} from '../../redux/slice/Tops/TopsSlice';
import {
  addFavourite,
  playTrack,
  removeFavourite,
} from '../../redux/slice/Player/mediaPlayerSlice';

const Library = () => {
  const dispatch = useDispatch<AppDispatch>();
  const playlists = useSelector((state: RootState) => state.playList.playlists);
  const {favoriteSongs} = useSelector((state: RootState) => state.favourite);
  const {media, currentPage} = useSelector(
    (state: RootState) => state.recentlyPlayed,
  );
  const [activeTab, setActiveTab] = useState(0);

  const fetchData = async () => {
    try {
      await dispatch(fetchPlaylists());
      await dispatch(fetchFavoriteSongs());
      await dispatch(fetchRecentlyPlayed(currentPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage]);

  const handlePlay = async (item: MediaItem) => {
    if (item.type === 'audio') {
      handleAudioSong(item);
    } else if (item.type === 'video') {
      await TrackPlayer.reset();
      navigate(SCREENS.VIDEO_PLAY);
    }
    dispatch(playTrack(item));
  };

  const handleAudioSong = async (i: MediaItem) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: i.id.toString(),
        url: i.file_path,
        title: i.title,
        artist: i.artist?.name || 'Unknown Artist',
        artwork: i.cover_image,
        duration: parseDuration(i.duration),
      });
      await TrackPlayer.play();
      dispatch(playTrack(i));
      console.log('Now playing:', i.title);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const handleDownload = () => {
    // Download song
  };

  const handleLikeToggle = (i: MediaItem) => {
    i.is_favorite
      ? dispatch(removeFavourite({mediaId: i.id, type: 'song'}))
      : dispatch(addFavourite({mediaId: i.id, type: 'song'}));
  };

  const handleMore = () => {
    // More options
  };

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return <PlayListContent items={playlists} />;
        break;
      case 1:
        return (
          <SongGrid
            data={favoriteSongs}
            onPlay={handlePlay}
            onLike={handleLikeToggle}
            onMore={handleMore}
            onDownload={handleDownload}
          />
        );
        break;
      case 2:
        return (
          <SongGrid
            data={media}
            onPlay={handlePlay}
            onLike={handleLikeToggle}
            onMore={handleMore}
            onDownload={handleDownload}
          />
        );
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaContainer safeArea={false}>
      <View paddingH-20 style={{paddingTop: Platform.OS == 'android' ? 35 : 0}}>
        <Header onPressLeft={() => toggleDrawer()} titleText="My Library" />
      </View>
      <View style={styles.container}>
        <View center marginV-20>
          <TabList
            width={screenWidth(30)}
            data={[
              {
                id: 1,
                label: 'My Playlist',
              },
              {
                id: 2,
                label: 'Favourite Songs',
              },
              {
                id: 3,
                label: 'Recently Played',
              },
            ]}
            onSelect={setActiveTab}
            selected={activeTab}
          />
        </View>
        <View flex>{renderTab()}</View>
      </View>
      {/* </LinearGradient> */}
      <FooterItem />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    width: '100%',
    height: screenHeight(20),
    backgroundColor: '#231F25',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2B2B2B',
    opacity: 0.8,
  },
});

export default Library;
