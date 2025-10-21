import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { AudioTrackPlayer, Header, Typography } from "../../components/atoms";
import { COLORS, IMAGES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import LineBarPLayer from "./LineBarPLayer";
import BtnPlayer from "./BtnPlayer";
import DownloadPlayer from "./DownloadPlayer";
import SongCard from "../HomeScreens/SongList";
import {onBack, toggleDrawer } from "../../navigation/RootNavigation";
const AudioPLay = () => {
  const navigation = useNavigation();
  const TOP_SONGS = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <SafeAreaContainer safeArea={true}>
      <View paddingH-10>
        <Header onPressLeft={() => toggleDrawer()} />
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => onBack()}>
            <Image
              source={IMAGES.arrowDown}
              style={{ width: 20, height: 20, alignSelf: "flex-end" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View center width={"100%"} height={200}>
            <Image
              source={IMAGES.imageAudio}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          </View>
          <View center marginV-20>
            <Typography size={25}>Kithaan Guzaari Raat</Typography>
            <Typography size={14}>Nadeem Abbas Khan Lonay Wala</Typography>
          </View>
          {LineBarPLayer()}
          {BtnPlayer()}
          {DownloadPlayer()}
          <Typography size={18} align="center">
            Queue
          </Typography>
          <View marginV-20>
            {TOP_SONGS.map((i) => {
              return (
                <SongCard
                  song="Wo Larki Khawab Mere Dekhti Hai"
                  artist="Zeeshan Khan Rokhri"
                  duration="05:23"
                />
              );
            })}
          </View>
          <AudioTrackPlayer />
        </ScrollView>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BLACK,
  },
});

export default AudioPLay;

