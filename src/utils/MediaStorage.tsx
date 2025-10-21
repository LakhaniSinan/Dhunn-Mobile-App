// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { parseDuration } from '../constants';

// type MediaItem = {
//   id: string;
//   url: string;
//   title: string;
//   artist: string;
//   artwork: string;
//   duration: number;
// };

// export const saveMediaItem = async (dd: any) => {
//     console.log('save started');
//   const media: MediaItem = {
//     id: dd.id.toString(),
//     url: dd.file_path,
//     title: dd.title,
//     artist: dd.artist?.name || 'Unknown Artist',
//     artwork: dd.cover_image,
//     duration: parseDuration(dd.duration),
//   };

//   try {
//     console.log('save started');
//     // Save the media item using its ID as the key
//     await AsyncStorage.setItem(`media_${media.id}`, JSON.stringify(media));

//     // Update the list of all media IDs
//     const storedIds = await AsyncStorage.getItem('media_ids');
//     const ids: string[] = storedIds ? JSON.parse(storedIds) : [];

//     if (!ids.includes(media.id)) {
//       ids.push(media.id);
//       await AsyncStorage.setItem('media_ids', JSON.stringify(ids));
   
//     }

//     console.log('Media saved successfully:', media);
//   } catch (err) {
//     console.error('Error saving media item:', err);
//   }
// };
