import { PermissionsAndroid, Platform } from 'react-native';

/**
 * Requests storage permission based on the Android version.
 * @returns {Promise<boolean>} A promise that resolves to true if permission is granted, false otherwise.
 */
export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    // Permissions are not required for iOS
    return true;
  }

  try {
    // Check if the permission is already granted
    const hasWritePermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    const hasReadPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );

    if (hasWritePermission && hasReadPermission) {
      return true;
    }

    // Request permissions based on Android version
    if (Platform.Version >= 33) {
      // Android 13 and above
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      ]);

      return (
        granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_MEDIA_VIDEO'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_MEDIA_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } else if (Platform.Version >= 29) {
      // Android 10 to 12
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // Below Android 10
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      return (
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
