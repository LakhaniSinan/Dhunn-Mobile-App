import React from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
  useColorScheme, // Hook to detect system dark/light mode
} from 'react-native';
import { IMAGES } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaContainer = (props: any) => {
  const {
    safeArea = true,
    backgroundColor = 'transparent',
    style = {},
  } = props;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const statusBarMode = isDarkMode ? 'light-content' : 'dark-content';
  const statusBarBgColor = isDarkMode ? 'black' : 'white'; // Change the status bar background color based on dark or light mode.
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <StatusBar
        translucent={true}
        backgroundColor={statusBarBgColor} 
        barStyle='light-content'
      />
      <ImageBackground
        source={IMAGES.bkImg}
        style={{ flex: 1 }} 
        resizeMode="cover"
      >
        {safeArea ? (
          <SafeAreaView
            style={{
              flex: 1,
              // paddingTop: Platform.OS == 'ios' ? 25 : 0,
              ...style,
            }}
          >
            {props.children}
          </SafeAreaView>
        ) : (
          <>{props.children}</>
        )}
      </ImageBackground>
    </View>
  );
};

export default SafeAreaContainer;
