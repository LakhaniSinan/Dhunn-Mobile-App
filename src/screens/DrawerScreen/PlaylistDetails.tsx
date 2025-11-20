import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {Button} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Typography} from '../../components/atoms';
import AddToPlayListModal from '../../components/molucule/AddToPlayListModal';
import {COLORS, parseDuration} from '../../constants';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {toggleDrawer} from '../../navigation/RootNavigation';
import {fetchPlaylistDetails} from '../../redux/slice/PlayList/createPlayList';
import {addQueueList} from '../../redux/slice/Player/mediaPlayerSlice';
import {AppDispatch, RootState} from '../../redux/store';
import ImageCardList from '../HomeScreens/ImageCardList';

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

  const handleAddToQueue = async () => {
    try {
      const audioTracks = playlistDetails?.media
        ?.filter(item => item.type === 'audio')
        .map(item => ({
          id: item.id.toString(),
          url: item.file_path,
          title: item.title,
          artist: item.artist?.name || 'Unknown Artist',
          artwork: item.cover_image,
          duration: parseDuration(item.duration),
        }));

      if (!audioTracks || audioTracks.length === 0) return;

      // Add to Redux queue
      dispatch(addQueueList(playlistDetails?.media));

      // ADD ALL TRACKS AT ONCE (this preserves order)
      await TrackPlayer.add(audioTracks);

      // Start playing only if nothing is currently playing
      const currentTrack = await TrackPlayer.getActiveTrack();
      if (!currentTrack) {
        await TrackPlayer.skip(audioTracks[0].id);
        await TrackPlayer.play();
      }

      console.log('Playlist added to queue:', audioTracks.length);
    } catch (err) {
      console.log('Queue error:', err);
    }
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
        {/* <SongGrid
            data={playlistDetails?.media}
            onPlay={handlePlay}
            onLike={handleLikeToggle}
            onMore={handleMore}
            onDownload={handleDownload}
          /> */}
        <View style={{flex: 1, paddingTop: 20}}>
          {playlistDetails?.media?.length > 0 ? (
            <ImageCardList customImages={playlistDetails?.media} columns />
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
