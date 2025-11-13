import {Platform, Alert} from 'react-native';
import RNFS from 'react-native-fs';
import {MediaItem} from '../redux/slice/Tops/TopsSlice';
import store from '../redux/store';
import {setDownloadProgress} from '../redux/slice/DownloadProgress/downloadProgressSlice';

export const handleDownloadSong = async (media: MediaItem) => {
  try {
    const fileExtension = media.file_path.split('.').pop() || 'file';

    const downloadDest =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${media.title.replace(
            / /g,
            '_',
          )}.${fileExtension}`
        : `${RNFS.DocumentDirectoryPath}/${media.title.replace(
            / /g,
            '_',
          )}.${fileExtension}`;

    const {promise} = RNFS.downloadFile({
      fromUrl: media.file_path,
      toFile: downloadDest,
      progressDivider: 5,
      progress: res => {
        const percent = Math.floor(
          (res.bytesWritten / res.contentLength) * 100,
        );
        store.dispatch(
          setDownloadProgress({
            isDownloading: true,
            progress: percent,
          }),
        );
      },
    });

    const result = await promise;

    if (result.statusCode === 200 || result.statusCode === 201) {
      store.dispatch(setDownloadProgress(null));
      setTimeout(() => {
        Alert.alert(`File downloaded successfully!`);
      }, 500);
    } else {
      console.error('Download failed:', result.statusCode);
      Alert.alert('Failed to download the file.');
    }
  } catch (error) {
    console.error('Download error:', error);
    Alert.alert('An error occurred while downloading the file.');
  }
};
