import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Typography} from '../../components/atoms';
import {FooterItem} from '../../components/atoms/FooterItem';
import ShimmerCards from '../../components/atoms/ShimmerCards';
import SongGrid from '../../components/atoms/SongGrid';
import {SCREENS} from '../../constants';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {navigate, toggleDrawer} from '../../navigation/RootNavigation';
import {fetchLanguageMedia} from '../../redux/slice/language/languageMediaSlice';
import {
  addFavourite,
  playTrack,
  removeFavourite,
} from '../../redux/slice/Player/mediaPlayerSlice';
import {MediaItem} from '../../redux/slice/Tops/TopsSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {handleAudioSong} from '../../utils/function';
import TabList from '../HomeScreens/TabList';
import {useNavigation} from '@react-navigation/native';

const LanguageDetails = ({route}: any) => {
  const navigation = useNavigation();
  const id = route.params.id;
  const dispatch = useDispatch<AppDispatch>();
  const {
    id: ids,
    name,
    audio,
    movie,
    video,
    loading,
    error,
  } = useSelector((state: RootState) => state.languageMedia);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {id: 0, label: 'Audio', key: 'audio'},
    {id: 1, label: 'Video', key: 'video'},
  ];

  useEffect(() => {
    dispatch(fetchLanguageMedia(id));
  }, [dispatch, id]);

  const getActiveData = () => {
    switch (tabs[activeTab].key) {
      case 'audio':
        return audio;
      case 'video':
        return video;
      case 'movie':
        return movie;
      default:
        return [];
    }
  };

  const activeData = getActiveData();

  const handlePlay = async (item: MediaItem) => {
    if (item.type === 'audio') {
      handleAudioSong(item, navigation);
    } else if (item.type === 'video') {
      await TrackPlayer.reset();
      navigate(SCREENS.VIDEO_PLAY);
    }
    dispatch(playTrack(item));
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

  return (
    <SafeAreaContainer safeArea={false}>
      <View paddingH-20 style={{paddingTop: Platform.OS == 'android' ? 20 : 0}}>
        <Header onPressLeft={() => toggleDrawer()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Typography align="center" size={20}>
          {name}
        </Typography>
        {activeData?.length !== 0 && (
          <View style={{marginVertical: 10}}>
            <TabList data={tabs} onSelect={setActiveTab} selected={activeTab} />
          </View>
        )}
        <View marginV-20 flex>
          {loading ? (
            Array.from({length: 5}).map((_, index) => <ShimmerCards />)
          ) : (
            <SongGrid
              data={activeData}
              onPlay={handlePlay}
              onLike={handleLikeToggle}
              onMore={handleMore}
              onDownload={handleDownload}
            />
          )}

          {activeData?.length === 0 && (
            <View center flex style={{marginTop: 20}}>
              <Typography>No Record Found</Typography>
            </View>
          )}
        </View>
      </ScrollView>
      <FooterItem />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default LanguageDetails;
