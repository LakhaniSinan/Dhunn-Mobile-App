// import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES } from "../../constants";
import { useState } from "react";

const BtnPlayer = () => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [isPlay, setIsPLay] = useState(false);
  const handleHeartToggle = () => {
    setIsHeartActive(!isHeartActive);
  };
  const handlePlayToggle = () => {
    setIsPLay(!isPlay);
  };

  return (
    <View row spread marginV-20 marginH-10>
      <Image
        source={IMAGES.replace}
        style={{ width: 25, height: 25 }}
        resizeMode="contain"
      />
      <View row center flex gap-10 style={{ alignItems: "center" }}>
        <TouchableOpacity>
          <Image
            source={IMAGES?.playleft}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={IMAGES?.playleft2}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayToggle}>
          <Image
            source={!isPlay ? IMAGES?.playerControler : IMAGES.pause}
            style={styles.iconStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={IMAGES?.playright}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={IMAGES?.playright2}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View></View>
      <TouchableOpacity onPress={handleHeartToggle}>
        <Image
          source={isHeartActive ? IMAGES.heart : IMAGES.heartLine}
          style={{ width: 25, height: 25 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 35,
    height: 35,
  },
});

export default BtnPlayer;
