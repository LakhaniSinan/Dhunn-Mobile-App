import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../components/atoms';
import {FooterItem} from '../../components/atoms/FooterItem';
import PlayListContent from '../../components/molucule/PlayListContent';
import {screenHeight, screenWidth} from '../../constants';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {toggleDrawer} from '../../navigation/RootNavigation';
import {fetchFavoriteSongs} from '../../redux/slice/Favourite/favouriteSlice';
import {fetchPlaylists} from '../../redux/slice/PlayList/createPlayList';
import {fetchRecentlyPlayed} from '../../redux/slice/RecentlyPlayed/recentlyPlayedSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {getDownloadedSongs} from '../../utils/function';
import ImageCardList from '../HomeScreens/ImageCardList';
import TabList from '../HomeScreens/TabList';
import DownloadedSongsCards from './DownloadedSongsCards';

const Library = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const playlists = useSelector((state: RootState) => state.playList.playlists);
  const {favoriteSongs} = useSelector((state: RootState) => state.favourite);
  const [downloadedSongs, setDownloadedSongs] = useState<RootState[]>([]);
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

  useEffect(() => {
    const loadDownloadedSongs = async () => {
      if (activeTab === 3) {
        const downloadedSongs = await getDownloadedSongs();
        setDownloadedSongs(downloadedSongs);
        console.log(downloadedSongs, 'downloadedSongsdownloadedSongs');
      }
    };
    loadDownloadedSongs();
  }, [activeTab]);

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return <PlayListContent items={playlists} />;
        break;
      case 1:
        return (
          <ImageCardList customImages={favoriteSongs} columns />
          // <SongGrid
          //   data={favoriteSongs}
          //   onPlay={handlePlay}
          //   onLike={handleLikeToggle}
          //   onMore={handleMore}
          //   onDownload={handleDownload}
          // />
        );
        break;
      case 2:
        return (
          <ImageCardList customImages={media} columns />
          // <SongGrid
          //   data={media}
          //   onPlay={handlePlay}
          //   onLike={handleLikeToggle}
          //   onMore={handleMore}
          //   onDownload={handleDownload}
          // />
        );
        break;
      case 3:
        return <DownloadedSongsCards customImages={downloadedSongs} columns />;
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
          <ScrollView
            horizontal
            contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 10}}>
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
                {
                  id: 4,
                  label: 'Your Downloads',
                },
              ]}
              onSelect={setActiveTab}
              selected={activeTab}
            />
          </ScrollView>
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
