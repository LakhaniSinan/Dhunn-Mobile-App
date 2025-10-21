import React, { useState } from "react";
import { Text, View } from "react-native-ui-lib";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, IMAGES, SCREENS } from "../../constants";
import { Typography } from "../atoms";
import { navigate } from "../../navigation/RootNavigation";

export const VideoCard = () => {
  const [isHeartActive, setIsHeartActive] = useState(true);
  const handleHeartToggle = () => {
    setIsHeartActive(!isHeartActive);
  };
  return (
    <View
      row
      spread
      centerV
      paddingV-10
      style={[
        {
          // backgroundColor: "#2B2B2B" ,
          backgroundColor: COLORS.BORDER,
        },
      ]}
    >
      <View row center gap-10 marginL-10>
        <TouchableOpacity onPress={() => navigate(SCREENS.VIDEO_PLAY)}>
          <Image
            source={IMAGES.play}
            style={{
              width: 30,
              height: 30,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
        <View center style={styles.containerImg}>
          <Image
            source={IMAGES.cameraCapture}
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
            }}
          />
        </View>
        <Typography style={{ width: "40%" }}>
          Wo Larki Khawab Mere Dekhti Hai
        </Typography>
        <TouchableOpacity onPress={handleHeartToggle}>
          <Image
            source={isHeartActive ? IMAGES.heart : IMAGES.heartLine}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <Image
          source={IMAGES.dotsVertical}
          style={{
            width: 30,
            height: 30,
            resizeMode: "cover",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerImg: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 10,
    borderWidth: 1,
    width: 70,
    height: 70,
  },
});
