import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header, Typography } from "../../components/atoms";
import { COLORS, IMAGES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { FooterItem } from "../../components/atoms/FooterItem";
import { commonStyles } from "../../globalStyle";

  const LineBarPLayer = () => {
    return (
      <View row spread marginH-10>
        <Typography>00:00</Typography>
        <View
          style={[
            commonStyles.lineBar,
            {
              width: "70%",
              height: 3,
              alignSelf: "center",
              borderColor: "#888888",
            },
          ]}
        >
          <Image
            source={IMAGES.circle}
            style={{ width: 50, height: 10, top: -4 }}
            resizeMode="contain"
          />
        </View>
        <Typography>05:22</Typography>
      </View>
    );
  };


const styles = StyleSheet.create({

});

export default LineBarPLayer;
