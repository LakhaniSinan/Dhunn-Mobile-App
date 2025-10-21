import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import AppNavigator from './AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStackNavigator } from './MainStackNavigator';
import { AppDispatch, RootState } from '../redux/store';
import { loadUserFromStorage } from '../constants';
import { loginUser } from '../redux/slice/User/userSlice';
import { getItem } from '../utils/localStorage';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from '../constants/playbackService';
import { useLogTrackPlayerState } from '../constants/useLogTrackPlayerState';
import { useSetupTrackPlayer } from '../constants/useSetupTrackPlayer';

TrackPlayer.registerPlaybackService(() => playbackService)

const MainNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleTrackPlayerLoaded = useCallback(() => {
    console.log('TrackPlayer setup completed');
  }, [])

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  })
  useLogTrackPlayerState();

  useEffect(() => {
    const fetchUserFromStorage = async () => {
      const token = await getItem('token')
      const user = await getItem('userDetails')
      if (user && token) {
        dispatch(
          loginUser({
            phoneNumber: user.phone,
            token,
            userDetails: user,
          })
        );
      }
    };

    fetchUserFromStorage();
  }, [dispatch]);

  return (
    <NavigationContainer ref={navigationRef}>
      {!isLoggedIn ? <AuthStackNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigation;
