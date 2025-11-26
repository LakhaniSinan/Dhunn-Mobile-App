import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Header, Typography} from '../../components/atoms';
import {COLORS, IMAGES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {LanguagesComp} from '../../components/molucule/LanguagesComp';
import {toggleDrawer} from '../../navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {fetchMediaByType} from '../../redux/slice/Home/homeSlice';
import ShimmerGridCard from '../../components/atoms/ShimmerGridCard';
import ArtistList from './ArtistList';
import VideoCard from './VideoCard';
import ImageCardList from './ImageCardList';
const {width} = Dimensions.get('window');
const ARTIST_DATA = [
  {id: '1', name: 'All'},
  {id: '2', name: 'Urdu'},
  {id: '3', name: 'Saraiki'},
  {id: '4', name: 'Punjabi'},
  {id: '5', name: 'Sindhi'},
  {id: '6', name: 'Pashto'},
  {id: '7', name: 'Balochi'},
];

const ViewSongs = (props: any) => {
  const title = props?.route?.params?.title;
  const type = props?.route?.params?.type;
  const dispatch = useDispatch<AppDispatch>();
  const {media, all_topArtists, loading} = useSelector(
    (state: RootState) => state.home,
  );
  let MediaType = null;
  let Title = null;

  switch (type) {
    case 'new_release':
      Title = 'New Releases';
      MediaType = media;
      break;
    case 'video_song':
      Title = 'Video Songs';
      MediaType = media;
      break;
    case 'top_artists':
      Title = 'Top Artists';
      MediaType = all_topArtists;
      break;
    case 'trending_song':
      Title = 'Trending Songs';
      MediaType = media;
      break;
    case 'pick_your_mode':
      Title = 'Pick Your Mood';
      MediaType = media;
      break;

    default:
      break;
  }
  useEffect(() => {
    dispatch(fetchMediaByType({type, page: 1, perPage: 20}));
  }, [dispatch, type]);

  const renderItem = ({item}: any) => (
    <View style={styles.artistItemContainer}>
      <View style={styles.artistItem}>
        <Image source={IMAGES.cameraImgL} style={styles.artistImage} />
      </View>
      <Text style={styles.artistName}>{item.name}</Text>
    </View>
  );
  const _renderView = () => {
    if (MediaType) {
      if (type === 'top_artists') {
        if (loading) {
          return <ShimmerGridCard />;
        }
        return <ArtistList artistData={all_topArtists} columns={true} />;
      } else if (type === 'video_song') {
        if (loading) {
          return <ShimmerGridCard />;
        }

        return <VideoCard customImages={media} columns={true} />;
      } else {
        if (loading) {
          return <ShimmerGridCard />;
        }
        return <ImageCardList customImages={media} columns={true} />;
      }
    }
  };

  return (
    <SafeAreaContainer safeArea={true}>
      <View paddingH-10 style={{paddingTop: Platform.OS == 'android' ? 20 : 0}}>
        <Header onPressLeft={() => toggleDrawer()} />
      </View>
      <View style={{flex: 1}}>
        <Typography align="center" size={20}>
          {title}
        </Typography>
        {_renderView()}
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  artistItemContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  artistItem: {
    backgroundColor: '#2B2B2B',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    width: width * 0.275,
    height: 100,
  },
  artistImage: {
    width: 50,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 25,
  },
  artistName: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ViewSongs;
