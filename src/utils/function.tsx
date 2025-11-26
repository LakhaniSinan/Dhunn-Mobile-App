import {Platform, Alert, PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import {MediaItem} from '../redux/slice/Tops/TopsSlice';
import store from '../redux/store';
import {setDownloadProgress} from '../redux/slice/DownloadProgress/downloadProgressSlice';
import {NativeModules} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {playTrack} from '../redux/slice/Player/mediaPlayerSlice';
import {IMAGES, parseDuration, SCREENS} from '../constants';

const {RingtoneModule} = NativeModules;

const getDhunnFolderPath = () => {
  return Platform.OS === 'android'
    ? `${RNFS.DownloadDirectoryPath}/Dhunn`
    : `${RNFS.DocumentDirectoryPath}/Dhunn`;
};

const ensureDhunnFolderExists = async () => {
  const folderPath = getDhunnFolderPath();

  const exists = await RNFS.exists(folderPath);
  if (!exists) {
    await RNFS.mkdir(folderPath);
    console.log('Dhunn folder created at:', folderPath);
  }

  return folderPath;
};

export const handleDownloadSong = async (media: MediaItem) => {
  try {
    const fileExtension = media.file_path.split('.').pop() || 'mp3';
    const folderPath = await ensureDhunnFolderExists();

    const fileName = `${media.title.replace(/ /g, '_')}.${fileExtension}`;
    const downloadDest = `${folderPath}/${fileName}`;

    store.dispatch(setDownloadProgress({isDownloading: true, progress: 0}));

    const {promise} = RNFS.downloadFile({
      fromUrl: media.file_path,
      toFile: downloadDest,
      progress: res => {
        const percent = Math.floor(
          (res.bytesWritten / res.contentLength) * 100,
        );
        store.dispatch(
          setDownloadProgress({isDownloading: true, progress: percent}),
        );
      },
    });

    const result = await promise;

    if (result.statusCode === 200 || result.statusCode === 201) {
      store.dispatch(setDownloadProgress(null));

      Alert.alert('Download Complete', `Your track downloaded successfully.`);
      return downloadDest; // important!
    } else {
      Alert.alert('Failed to download the file.');
      return null;
    }
  } catch (error) {
    Alert.alert('Error downloading file.');
    return null;
  }
};

export const getDownloadedSongs = async () => {
  const folderPath = getDhunnFolderPath();

  const exists = await RNFS.exists(folderPath);
  if (!exists) return [];

  const files = await RNFS.readDir(folderPath);

  return files
    .filter(file => file.isFile())
    .map(file => ({
      name: file.name,
      path: 'file://' + file.path,
      size: file.size,
    }));
};

export const handleSetRingtone = async (title: string) => {
  const downloadDest =
    Platform.OS === 'android'
      ? `${RNFS.DownloadDirectoryPath}/${title.replace(/ /g, '_')}.mp3`
      : `${RNFS.DocumentDirectoryPath}/${title.replace(/ /g, '_')}.mp3`;

  RingtoneModule.setRingtone(downloadDest)
    .then(msg => Alert.alert('Ringtone set successfully'))
    .catch(err => console.log(err));
};

export const handleAudioSong = async (song: any, navigation?: any) => {
  try {
    const queue = await TrackPlayer.getQueue();
    console.log(queue, 'songsongsongsongsong');

    if (song?.path) {
      let findRess = queue?.findIndex(track => track.url.includes('https://'));
      if (findRess !== -1) {
        await TrackPlayer.reset();
        await TrackPlayer.add({
          url: song.path,
          title: song.name,
          artist: 'Offline',
          artwork:
            'https://dhunn.pk/dhun-uploads/user/N1iBvfGHD26KeekraPfU.png',
        });
        await TrackPlayer.play();
        store.dispatch(
          playTrack({
            ...song,
            title: song.name,
            file_path: song.path,
            type: 'audio',
          }),
        );
      } else {
        let index = queue.findIndex(
          t => t?.title?.toString() === song.name.toString(),
        );
        if (index === -1) {
          await TrackPlayer.add({
            url: song.path,
            title: song.name,
            artist: 'Offline',
            artwork:
              'https://dhunn.pk/dhun-uploads/user/N1iBvfGHD26KeekraPfU.png',
          });
          const newQueue = await TrackPlayer.getQueue();
          index = newQueue.length - 1;
        }
        await TrackPlayer.skip(index);
        await TrackPlayer.play();
        store.dispatch(
          playTrack({
            ...song,
            title: song.name,
            file_path: song.path,
            type: 'audio',
          }),
        );
      }
    } else {
      let findRess = queue?.findIndex(track => track.url.includes('file://'));
      if (findRess !== -1) {
        await TrackPlayer.reset();
        await TrackPlayer.add({
          id: song.id.toString(),
          url: song.file_path,
          title: song.title,
          artist: song.artist?.name || 'Unknown Artist',
          artwork: song.cover_image,
          duration: parseDuration(song.duration),
        });
        await TrackPlayer.play();
        store.dispatch(playTrack(song));
      } else {
        let index = queue.findIndex(
          t => t.id.toString() === song.id.toString(),
        );
        if (index === -1) {
          await TrackPlayer.add({
            id: song.id.toString(),
            url: song.file_path,
            title: song.title,
            artist: song.artist?.name || 'Unknown Artist',
            artwork: song.cover_image,
            duration: parseDuration(song.duration),
          });
          const newQueue = await TrackPlayer.getQueue();
          index = newQueue.length - 1;
        }
        await TrackPlayer.skip(index);
        await TrackPlayer.play();

        store.dispatch(playTrack(song));
        navigation.navigate(SCREENS.AUDIO_PLAY);
      }
    }
  } catch (error) {
    console.error('Error playing track:', error);
  }
};
