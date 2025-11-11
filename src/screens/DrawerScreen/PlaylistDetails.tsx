import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {fetchPlaylistDetails} from '../../redux/slice/PlayList/createPlayList';
import {
  addFavourite,
  addQueueList,
  playTrack,
  removeFavourite,
} from '../../redux/slice/Player/mediaPlayerSlice';
import AddToPlayListModal from '../../components/molucule/AddToPlayListModal';
import SongCardList from '../HomeScreens/SongCard';
import {MediaItem} from '../../redux/slice/Tops/TopsSlice';
import TrackPlayer from 'react-native-track-player';
import {navigate, toggleDrawer} from '../../navigation/RootNavigation';
import {COLORS, parseDuration, SCREENS, screenWidth} from '../../constants';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Header, Typography} from '../../components/atoms';
import {Button} from 'react-native-ui-lib';
import SongGrid from '../../components/atoms/SongGrid';

const PlaylistDetails = ({route}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {playlistDetails, loading} = useSelector(
    (state: RootState) => state.playList,
  );
  const playlists = useSelector((state: RootState) => state.playList.playlists);
  const {is_playlist} = useSelector((state: RootState) => state.playlistModal);

  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const animationContainer = useRef(null);

  // Load playlist details on mount
  useEffect(() => {
    dispatch(fetchPlaylistDetails(route.params.id));
  }, [dispatch, route.params.id, playlists]);

  const handleToggle = (id: number) => {
    setOpenCardId(openCardId === id ? null : id);
  };
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

  const handleAddToQueue = () => {
    // Add the playlist media to the queue in Redux
    dispatch(addQueueList(playlistDetails?.media));

    // Add the media to the Track Player
    playlistDetails?.media.forEach((item: MediaItem) => {
      if (item.type === 'audio') {
        TrackPlayer.add({
          id: item.id.toString(),
          url: item.file_path,
          title: item.title,
          artist: item.artist?.name || 'Unknown Artist',
          artwork: item.cover_image,
          duration: parseDuration(item.duration),
        });
      }
    });

    // Start playing the first track
    TrackPlayer.play();
  };

  if (loading) {
    return (
      <SafeAreaContainer
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer safeArea={true}>
      <View
        style={{
          paddingTop: Platform.OS == 'android' ? 20 : 0,
          paddingHorizontal: 20,
        }}>
        <Header onPressLeft={() => toggleDrawer()} titleText="My Playlist" />
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Typography size={24} textType="bold">
            {playlistDetails?.name}
          </Typography>
          <Button
            label="Add To Queue"
            onPress={handleAddToQueue}
            style={{
              backgroundColor: COLORS.PRIMARY,
            }}
          />
        </View>
        <View style={{flex: 1, paddingTop: 20}}>
          {playlistDetails?.media.length !== 0 ? (
            <SongGrid
              data={playlistDetails?.media}
              onPlay={handlePlay}
              onLike={handleLikeToggle}
              onMore={handleMore}
              onDownload={handleDownload}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text style={{fontSize: 18, color: '#00B8D4'}}>
                No Record Found
              </Text>
            </View>
          )}
        </View>
      </View>
      <AddToPlayListModal is_playlist={is_playlist} />
    </SafeAreaContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
export default PlaylistDetails;
