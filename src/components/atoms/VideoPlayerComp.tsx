import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoPlayerComp = () => {
  return (
      <View style={styles.videoContainer}>
    <Video
        source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
        ref={(ref) => {
           _player = ref
        }}                                      
   
        style={styles.video}/>
</View>
  );
};

const styles = StyleSheet.create({

  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
  
},
video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius:20
}
});

export default VideoPlayerComp;
