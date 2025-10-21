import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms";
import { IMAGES } from "../../constants";

import { commonStyles } from "../../globalStyle";

const DownloadPlayer = () => {
  return (
    <View spread row marginH-10 gap-20 center>
      <Image
        source={IMAGES.volume}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
      <View
        style={[
          commonStyles.lineBar,
          {
            width: "70%",
            height: 3,
            alignSelf: "center",
            borderColor: "#fff",
          },
        ]}
      >
        <Image
          source={IMAGES.circle}
          style={{ width: 50, height: 10, top: -4,alignSelf:'flex-end' }}
          resizeMode="contain"
        />
      </View>
      <Image
        source={IMAGES.download}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DownloadPlayer;
