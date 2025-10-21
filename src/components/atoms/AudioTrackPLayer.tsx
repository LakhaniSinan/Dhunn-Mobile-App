import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TrackPlayer from 'react-native-track-player';

export const AudioTrackPlayer = () => {
  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'trackId',
        url: 'http://example.com/track.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
      });
      TrackPlayer.play();
    };

    setupPlayer();

    return () => {
      TrackPlayer.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
