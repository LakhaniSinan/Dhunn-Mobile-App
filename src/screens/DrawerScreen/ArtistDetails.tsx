import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-ui-lib';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Header, Typography} from '../../components/atoms';
import {FooterItem} from '../../components/atoms/FooterItem';
import {navigate, toggleDrawer} from '../../navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {fetchArtistDetails} from '../../redux/slice/Artist/artistSlice';
import ShimmerGridCard from '../../components/atoms/ShimmerGridCard';
import {
  COLORS,
  IMAGES,
  parseDuration,
  screenHeight,
  SCREENS,
} from '../../constants';
import {CollapsableContainer} from '../../components/molucule/CollapsableContainer';
import TabList from '../HomeScreens/TabList';
import SongCard from '../HomeScreens/SongList';
import {
  addFavourite,
  playTrack,
  removeFavourite,
} from '../../redux/slice/Player/mediaPlayerSlice';
import {MediaItem} from '../../redux/slice/Tops/TopsSlice';
import TrackPlayer from 'react-native-track-player';
import SongGrid from '../../components/atoms/SongGrid';
import {handleAudioSong} from '../../utils/function';
import {useNavigation} from '@react-navigation/native';
import ImageCardList from '../HomeScreens/ImageCardList';

const ArtistDetails = ({route}: any) => {
  const navigation = useNavigation();
  const artistId = route.params.artistId;
  const dispatch = useDispatch<AppDispatch>();
  const {artistDetails, loadingArtistDetails} = useSelector(
    (state: RootState) => state.artist,
  );
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {id: 0, label: 'Audio', key: 'audio'},
    {id: 1, label: 'Video', key: 'video'},
  ];

  useEffect(() => {
    dispatch(fetchArtistDetails(artistId));
  }, [dispatch, artistId]);

  const getActiveData = () => {
    switch (tabs[activeTab].key) {
      case 'audio':
        return artistDetails?.media.filter(i => i.type == 'audio');
      case 'video':
        return artistDetails?.media.filter(i => i.type == 'video');
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

  const __rederData = () => {
    if (loadingArtistDetails) {
      return <ShimmerGridCard />;
    } else {
      return (
        <View flex>
          <Image
            source={
              artistDetails?.image !== null
                ? {uri: artistDetails?.image}
                : IMAGES.bkImg
            }
            style={{
              width: '100%',
              height: screenHeight(25),
              resizeMode: 'cover',
              borderRadius: 20,
            }}
          />
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Typography size={18}>About Artist</Typography>
              <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                style={styles.iconButton}>
                <Image source={IMAGES.dropdown} style={styles.dropdownIcon} />
              </TouchableOpacity>
            </View>

            <CollapsableContainer expanded={expanded}>
              <View style={styles.detailRow}>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  Artist
                </Typography>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  {artistDetails?.name}
                </Typography>
              </View>
              <View style={styles.detailRow}>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  Bio
                </Typography>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  {artistDetails?.bio}
                </Typography>
              </View>
            </CollapsableContainer>
          </View>
          {artistDetails?.media.length !== 0 && (
            <View style={{marginVertical: 10}}>
              <TabList
                data={tabs}
                onSelect={setActiveTab}
                selected={activeTab}
              />
            </View>
          )}
          {activeData?.length !== 0 ? (
            <ImageCardList customImages={activeData} />
          ) : (
            <View center flex style={{marginTop: 20}}>
              <Typography>No Record Found</Typography>
            </View>
          )}
        </View>
      );
    }
  };
  return (
    <SafeAreaContainer safeArea={false}>
      <View paddingH-20 style={{paddingTop: Platform.OS == 'android' ? 20 : 0}}>
        <Header onPressLeft={() => toggleDrawer()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {__rederData()}
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
  card: {
    backgroundColor: '#231F25',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2B2B2B',
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    alignItems: 'center',
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  detailRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default ArtistDetails;
