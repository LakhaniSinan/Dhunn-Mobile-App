import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Sound from "react-native-sound";
import Slider from "@react-native-community/slider";
import { COLORS } from "../../constants";
import { Typography } from "./Typography";

Sound.setCategory("Playback");

const AudioPlayerComp = ({ showDuration = true, showCurrentTime = true ,width = 250}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(20);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Sound(
      "path_to_your_audio_file.mp3",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("Failed to load the sound", error);
          return;
        }
        setDuration(soundRef.current.getDuration());
      }
    );

    return () => {
      soundRef.current.release();
    };
  }, []);

  const play = () => {
    soundRef.current.play(() => {
      setIsPlaying(false);
    });
    setIsPlaying(true);
    startUpdate();
  };

  const pause = () => {
    soundRef.current.pause();
    setIsPlaying(false);
  };

  const seek = (value:any) => {
    soundRef.current.setCurrentTime(value);
    setCurrentTime(value);
  };

  const startUpdate = () => {
    const interval = setInterval(() => {
      if (!isSeeking) {
        soundRef.current.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const formatTime = (time:any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      {showCurrentTime && (
        <Typography style={styles.time}>{formatTime(currentTime)}</Typography>
      )}
      <Slider
        style={{ width: width}}
        minimumValue={10}
        maximumValue={duration}
        value={currentTime}
        onSlidingStart={() => setIsSeeking(true)}
        onSlidingComplete={(value) => {
          seek(value);
          setIsSeeking(false);
        }}
        minimumTrackTintColor={COLORS.PRIMARY}
        maximumTrackTintColor={COLORS.PRIMARY}
        thumbTintColor={COLORS.PRIMARY}
      />
      {showDuration && (
        <Typography style={styles.time}>{formatTime(duration)}</Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:2,
    borderColor:'red',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  time: {
    fontSize: 16,
  },
});

export default AudioPlayerComp;
