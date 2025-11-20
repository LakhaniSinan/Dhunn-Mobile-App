/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {loginUser} from './src/redux/slice/User/userSlice';
import {getItem} from './src/utils/localStorage';
import TrackPlayer from 'react-native-track-player';
import {playbackService} from './src/constants/playbackService';

const ReduxWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const fetchUserFromStorage = async () => {
  const token = await getItem('token');
  const user = await getItem('userDetails');
  if (user && token) {
    store.dispatch(
      loginUser({
        phoneNumber: user.phone,
        token,
        userDetails: user,
      }),
    );
  }
};

fetchUserFromStorage();

TrackPlayer.registerPlaybackService(() => playbackService);
AppRegistry.registerComponent(appName, () => ReduxWrapper);
