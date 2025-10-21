import React, { useState } from "react";
import {  StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import AudioPlayerComp from "../../components/atoms/AudioPLayerComp";

const LineBarPLayer = () => {
  return (
    <View row spread marginH-10>
      <AudioPlayerComp />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LineBarPLayer;
