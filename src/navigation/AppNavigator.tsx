import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS, SCREENS, IMAGES} from '../constants';
import Home from '../screens/HomeScreens';
import Library from '../screens/DrawerScreen/Library';
import {CustomDrawerContent} from './DrawerScreen';
import SearchScreen from '../screens/DrawerScreen/SearchScreen';
import Artist from '../screens/DrawerScreen/Artist';
import Language from '../screens/DrawerScreen/Language';
import Subscribe from '../screens/DrawerScreen/Subscribe';
import OTPScreen from '../screens/DrawerScreen/OTPScreen';
import ViewSongs from '../screens/HomeScreens/ViewSongs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AudioPLay from '../screens/PlayScreen/AudioPLay';
import Terms from '../screens/DrawerScreen/Terms';
import SearchPopup from '../screens/HomeScreens/SearchPopup';
import Successful from '../screens/DrawerScreen/Successful';
import VideoPlay from '../screens/VideoScreen/VideoPLay';
import ViewVideo from '../screens/HomeScreens/ViewVideo';
import {FooterItem} from '../components/atoms/FooterItem';
import LanguageDetails from '../screens/DrawerScreen/LanguageDetails';
import ArtistDetails from '../screens/DrawerScreen/ArtistDetails';
import PlaylistDetails from '../screens/DrawerScreen/PlaylistDetails';
import ProfileScreen from '../screens/DrawerScreen/ProfileScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: COLORS.BLACK,
            width: 300,
          },
        }}>
        <Drawer.Screen name={SCREENS.STACK} component={StackCompoonent} />
        <Drawer.Screen name={SCREENS.MY_LIBRARY} component={Library} />
        <Drawer.Screen name={SCREENS.AUDIO_PLAY} component={AudioPLay} />
        <Drawer.Screen name={SCREENS.LANGUAGE} component={Language} />
        <Drawer.Screen name={SCREENS.ARTIST} component={Artist} />
        <Drawer.Screen name={SCREENS.SEARCH} component={SearchScreen} />
      </Drawer.Navigator>
    </>
  );
};

const StackCompoonent = () => {
  const {currentTrack} = useSelector((state: RootState) => state.mediaPlayer);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SCREENS.HOME} component={Home} />
        <Stack.Screen name={SCREENS.SUBSCRIBE} component={Subscribe} />
        <Stack.Screen name={SCREENS.OTP} component={OTPScreen} />
        <Stack.Screen name={SCREENS.SUCCESSFUL} component={Successful} />
        <Stack.Screen name={SCREENS.TERMS} component={Terms} />
        <Stack.Screen name={SCREENS.VIEW} component={ViewSongs} />
        <Stack.Screen name={SCREENS.VIEW_VIDEO} component={ViewVideo} />
        <Stack.Screen
          name={SCREENS.LANGUAGE_DETAILS}
          component={LanguageDetails}
        />
        <Stack.Screen name={SCREENS.ARTIST_DETAILS} component={ArtistDetails} />
        <Stack.Screen
          name={SCREENS.PLAYLIST_DETAILS}
          component={PlaylistDetails}
        />
        <Stack.Screen name={SCREENS.PROFILE_SCREEN} component={ProfileScreen} />
        <Stack.Screen
          options={{
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
          name={SCREENS.AUDIO_PLAY}
          component={AudioPLay}
        />
        <Stack.Screen
          options={{
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
          name={SCREENS.VIDEO_PLAY}
          component={VideoPlay}
        />
        <Stack.Screen name={SCREENS.SEARCH_POPUP} component={SearchPopup} />
      </Stack.Navigator>
      <FooterItem />
    </>
  );
};

export default AppNavigator;
