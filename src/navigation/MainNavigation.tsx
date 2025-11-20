import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useLogTrackPlayerState} from '../constants/useLogTrackPlayerState';
import {useSetupTrackPlayer} from '../constants/useSetupTrackPlayer';
import {RootState} from '../redux/store';
import AppNavigator from './AppNavigator';
import {AuthStackNavigator} from './MainStackNavigator';
import {navigationRef} from './RootNavigation';

const MainNavigation = () => {
  const {userDetails, token} = useSelector((state: RootState) => state.user);

  const handleTrackPlayerLoaded = useCallback(() => {
    console.log('TrackPlayer setup completed');
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });
  useLogTrackPlayerState();

  return (
    <NavigationContainer ref={navigationRef}>
      {userDetails ? <AppNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigation;
