import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';
import React, {useActionState, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TrackPlayer, {Event, useActiveTrack} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, IMAGES, SCREENS} from '../../constants';
import {navigate, onBack} from '../../navigation/RootNavigation';
import {
  addFavourite,
  clearTrack,
  removeFavourite,
  setCurrentTrack,
} from '../../redux/slice/Player/mediaPlayerSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {PlayPauseButton, SkipToNextButton} from '../molucule/PlayerControls';
import Icon from './Icon';
import {MovingText} from './MovingText';
import {getMediaById} from '../../redux/slice/Home/homeSlice';

const getActiveRouteName = (state: any): string => {
  if (!state || !state.routes || state.index >= state.routes.length) {
    return '';
  }

  const route = state.routes[state.index];

  // If nested navigator
  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

export const FooterItem = (props: any) => {
  const navigation = useNavigation();
  const {onPressRight} = props;
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const {
    currentTrack,
    isPlaying,
    volume,
    mute,
    media_duration,
    currentTime,
    isShuffled,
  } = useSelector((state: RootState) => state.mediaPlayer);
  const activeTrack = useActiveTrack();
  const route = useRoute();
  const currentRouteName = useNavigationState(state => {
    return getActiveRouteName(state);
  });

  useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      Event.PlaybackActiveTrackChanged,
      async (event: any) => {
        console.log('Active track changed:', event);

        const activeTrackIndex = event.index;
        const activeTrack = event.track;

        // Option 1: Track object is already included (modern versions)
        if (activeTrack?.id) {
          console.log('Active track object:', activeTrack);
          dispatch(getMediaById(activeTrack?.id))
            .unwrap()
            .then(result => {
              dispatch(setCurrentTrack(result.response));
            })
            .catch(err => console.log('getMediaById error:', err));
          return;
        }

        // Option 2: Need to fetch manually by index
        if (typeof activeTrackIndex === 'number') {
          const track = await TrackPlayer.getTrack(activeTrackIndex);
          if (track) {
            console.log('Fetched active track by index:', track);
            dispatch(getMediaById(track?.id))
              .unwrap()
              .then(result => {
                dispatch(setCurrentTrack(result.response));
              })
              .catch(err => console.log('getMediaById error:', err));
          }
        }
      },
    );

    return () => {
      listener.remove();
    };
  }, [dispatch]);

  const handleLikeToggle = () => {
    currentTrack.is_favorite
      ? dispatch(removeFavourite({mediaId: currentTrack.id, type: 'song'}))
      : dispatch(addFavourite({mediaId: currentTrack.id, type: 'song'}));
  };

  const clearCurrentSong = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    dispatch(clearTrack());
    onBack();
  };

  if (
    currentTrack.file_path === '' ||
    currentRouteName == 'AudioPLay' ||
    currentTrack.type !== 'audio'
  )
    return null;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        //  navigate(SCREENS.AUDIO_PLAY)
        navigate(SCREENS.STACK, {
          screen: SCREENS.AUDIO_PLAY,
        })
      }
      style={{
        position: 'absolute',
        bottom: insets.bottom,
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
      }}>
      <>
        <Image
          source={{
            uri:
              activeTrack?.artwork ||
              'https://dhunn.pk/dhun-uploads/user/N1iBvfGHD26KeekraPfU.png',
          }}
          style={styles.trackArtworkImage}
        />

        <View style={styles.trackTitleContainer}>
          <MovingText
            style={styles.trackTitle}
            text={currentTrack.title ?? ''}
            animationThreshold={25}
          />
        </View>

        <View style={styles.trackControlsContainer}>
          {!activeTrack?.url?.includes('file://') && (
            <TouchableOpacity onPress={handleLikeToggle}>
              <Image
                source={
                  currentTrack.is_favorite ? IMAGES.heart : IMAGES.heartLine
                }
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          <PlayPauseButton iconSize={20} containerSize={40} />
          <SkipToNextButton iconSize={40} />
          <Icon
            vector="Entypo"
            name="cross"
            color={COLORS.WHITE}
            size={22}
            onPress={clearCurrentSong}
          />
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 10,
    color: COLORS.WHITE,
  },
  icon: {
    width: 30, // Adjust the size based on your icon dimensions
    height: 30,
  },
  trackTitle: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
