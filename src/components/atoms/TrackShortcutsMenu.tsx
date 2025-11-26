import {MenuView} from '@react-native-menu/menu';
import {PropsWithChildren, useEffect, useState} from 'react';
import {Alert, Platform, Share} from 'react-native';
import TrackPlayer, {Track, useActiveTrack} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {match} from 'ts-pattern';
import {COLORS, parseDuration} from '../../constants';
import {
  addFavourite,
  addToQueue,
  clearTrack,
  removeFavourite,
  removeFromQueue,
} from '../../redux/slice/Player/mediaPlayerSlice';
import {openPlaylistModel} from '../../redux/slice/PlayList//playListModal';
import {MediaItem} from '../../redux/slice/Tops/TopsSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {handleDownloadSong, handleSetRingtone} from '../../utils/function';
import {useNavigation} from '@react-navigation/native';

type TrackShortcutsMenuProps = PropsWithChildren<{track: MediaItem}>;

export const TrackShortcutsMenu = ({
  showAddQueue = true,
  type = 'default',
  track,
  children,
}: TrackShortcutsMenuProps) => {
  const navigation = useNavigation();
  const activeTrack = useActiveTrack();
  const dispatch = useDispatch<AppDispatch>();
  const {queue} = useSelector((state: RootState) => state.mediaPlayer);
  const {playlistDetails, loading} = useSelector(
    (state: RootState) => state.playList,
  );
  const [myQueue, setMyQueue] = useState<Track[]>([]);
  const isFavorite = track?.is_favorite;
  const isPlaylist = track?.is_playlist;
  const [isInQueueTrack, setIsInQueueTrack] = useState(false);

  useEffect(() => {
    const getQueue = async () => {
      const trackPlayerqueue = await TrackPlayer.getQueue();
      setMyQueue(trackPlayerqueue);
      let findTrack = trackPlayerqueue.findIndex(
        (song: any) => song.id == track.id.toString(),
      );
      if (findTrack !== -1) setIsInQueueTrack(true);
    };
    getQueue();
  }, [queue, activeTrack]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check this out: ${track.file_path || track.url}`,
        url: track.file_path || track.url, // Optional, some platforms might not use this directly
        title: track.title, // Optional title for iOS
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('URL shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed.');
      }
    } catch (error) {
      console.error('Error while sharing:', error);
      Alert.alert('URL copied to clipboard.');
    }
  };
  const handlePressAction = (id: string) => {
    match(id)
      .with('add-to-favorites', async () => {
        dispatch(addFavourite({mediaId: track.id, type: 'song'}));
      })
      .with('remove-from-favorites', async () => {
        dispatch(removeFavourite({mediaId: track.id, type: 'song'}));
      })
      .with('add-to-queue', async () => {
        const trackIndex = myQueue.findIndex(t => t.id == track.id.toString());

        const isCurrent = activeTrack?.id?.toString() === track.id.toString();

        if (isInQueueTrack && trackIndex !== -1) {
          if (myQueue.length === 1) {
            await TrackPlayer.stop();
            await TrackPlayer.reset();
            dispatch(clearTrack());
            dispatch(removeFromQueue(track.id));
            setIsInQueueTrack(false);
            navigation.goBack();
            return;
          }

          if (isCurrent) {
            if (trackIndex < myQueue.length - 1) {
              await TrackPlayer.skip(trackIndex + 1);
              await TrackPlayer.play();
            } else {
              await TrackPlayer.skip(trackIndex - 1);
              await TrackPlayer.play();
            }
          }

          await TrackPlayer.remove([trackIndex]);
          dispatch(removeFromQueue(track.id));
          setIsInQueueTrack(false);
        } else {
          await TrackPlayer.add({
            id: track.id.toString(),
            url: track.file_path,
            title: track.title,
            artist: track.artist?.name || 'Unknown Artist',
            artwork: track.cover_image,
            duration: parseDuration(track.duration),
          });
          dispatch(addToQueue(track));
        }
      })
      .with('share', async () => onShare())
      .with('add-to-playlist', async () =>
        dispatch(
          openPlaylistModel({
            media_id: track.id,
            is_playlist: track.is_playlist !== null ? true : false,
          }),
        ),
      )
      .with('download', async () => {
        handleDownloadSong(track);
      })
      .with('add-to-ringtone', async () => {
        handleSetRingtone(track?.title);
      })
      .otherwise(() => console.warn(`Unknown menu action ${id}`));
  };

  return (
    <MenuView
      onPressAction={({nativeEvent: {event}}) => handlePressAction(event)}
      themeVariant="dark"
      actions={[
        {
          id: 'share',
          title: 'Share',
          // image: Platform.select({
          //   ios: 'share',
          //   android: 'ic_menu_share',
          // }),
          imageColor: Platform.OS == 'android' ? COLORS.BLACK : '',
        },
        ...(type !== 'queue'
          ? [
              {
                id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
                title: isFavorite
                  ? 'Remove from favorites'
                  : 'Add to favorites',
                image: Platform.select({
                  ios: isFavorite ? 'heart.fill' : 'heart',
                  android: isFavorite ? 'heart.fill' : 'heart',
                }),
                imageColor: isFavorite
                  ? COLORS.PRIMARY
                  : Platform.OS == 'android'
                  ? COLORS.BLACK
                  : '',
              },
            ]
          : []),
        ...(myQueue?.length > 1
          ? [
              {
                id: 'add-to-queue',
                title: `${isInQueueTrack ? 'Remove from' : 'Add to'} Queue`,
                imageColor: Platform.OS === 'android' ? COLORS.BLACK : '',
              },
            ]
          : []),
        {
          id: 'download',
          title: 'Download',
          // image: Platform.select({
          //   ios: 'download',
          //   android: 'ic_menu_download',
          // }),
          imageColor: Platform.OS == 'android' ? COLORS.BLACK : '',
        },
        ...(type !== 'queue'
          ? [
              {
                id: 'add-to-playlist',
                title: isPlaylist ? 'Remove from playlist' : 'Add to playlist',
                // image: Platform.select({
                //   ios: 'download',
                //   android: 'ic_menu_download',
                // }),
                imageColor: Platform.OS == 'android' ? COLORS.BLACK : '',
              },
            ]
          : []),
        // {
        //   id: 'add-to-ringtone',
        //   title: 'Add to ringtone',
        //   // image: Platform.select({
        //   //   ios: 'download',
        //   //   android: 'ic_menu_download',
        //   // }),
        //   imageColor: Platform.OS == 'android' ? COLORS.BLACK : '',
        // },
      ]}>
      {children}
    </MenuView>
  );
};
