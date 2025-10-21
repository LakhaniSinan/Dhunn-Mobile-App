import React, { useState } from "react";
import {
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import {
  COLORS,
  IMAGES,
  parseDuration,
  SCREENS,
  screenWidth,
} from "../../constants";
import { Typography } from "../../components/atoms";
import { View } from "react-native-ui-lib";
import { navigate } from "../../navigation/RootNavigation";
import { TrackSlidesProps } from "./ImageCardList";
import TrackPlayer from "react-native-track-player";
import { MediaItem } from "../../redux/slice/Tops/TopsSlice";
import { playTrack } from "../../redux/slice/Player/mediaPlayerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const { width } = Dimensions.get("window");

const VideoCard: React.FC<TrackSlidesProps> = ({
  cardStyle,
  customImages,
  columns,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePlay = async (item: MediaItem) => {
    if (item.type === "audio") {
      handleAudioSong(item);
    } else if (item.type === "video") {
      await TrackPlayer.reset();
      navigate(SCREENS.VIDEO_PLAY);
    }
    dispatch(playTrack(item));
  };
  const handleAudioSong = async (i: MediaItem) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: i.id.toString(),
        url: i.file_path,
        title: i.title,
        artist: i.artist?.name || "Unknown Artist",
        artwork: i.cover_image,
        duration: parseDuration(i.duration),
      });
      await TrackPlayer.play();
      dispatch(playTrack(i));
      console.log("Now playing:", i.title);
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  const renderItem = ({ item }: { item: MediaItem }) => (
    <TouchableOpacity
      onPress={() => handlePlay(item)}
      key={item.id}
      style={[cardStyle, { borderWidth: 1, borderColor: "#2B2B2B" }]}
    >
      <View marginV-10 marginR-10>
        <ImageBackground
          source={
            item.cover_image !== null
              ? { uri: item.cover_image }
              : IMAGES.imageCont
          }
          style={styles.artistItem}
          imageStyle={{ borderRadius: 10 }}
          resizeMode="contain"
        >
          <View
            style={{
              position: "absolute",
              right: 10,
              bottom: 5,
              borderWidth: 1,
              backgroundColor: COLORS.PRIMARY,
              borderRadius: 10,
              paddingHorizontal: 5,
            }}
          >
            <Typography size={10} textType="bold">
              {item.duration}
            </Typography>
          </View>
        </ImageBackground>
        <Typography
          size={12}
          style={styles.artistName}
          textType="bold"
          numberOfLines={1}
        >
          {item.title}
        </Typography>
        <View row center style={{ alignItems: "center" }}>
          <Image
            source={IMAGES.eye}
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
          />
          <Typography size={9} textType="bold">
            {item.favorite_count} views
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {columns ? (
        <FlatList
          data={customImages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Dynamic number of columns
          // columnWrapperStyle={styles.columnWrapper} // Add padding between rows
          // contentContainerStyle={{flex:1}}
          // style={{ flex:1,}}
          // showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 10}}>
          {customImages.map((item, index) => (
            <TouchableOpacity
              onPress={() => handlePlay(item)}
              key={index}
              style={[cardStyle, { borderWidth: 1, borderColor: "#2B2B2B", borderRadius: 10 ,backgroundColor: "#231F25"}]} 
            >
              <View marginV-10 marginR-10>
                <ImageBackground
                  source={
                    item.cover_image !== null
                      ? { uri: item.cover_image }
                      : IMAGES.imageCont
                  }
                  style={styles.artistItem}
                  resizeMode="contain"
                  imageStyle={{ borderRadius: 10 }}
                >
                  <View
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 5,
                      borderWidth: 1,
                      backgroundColor: COLORS.PRIMARY,
                      borderRadius: 10,
                      paddingHorizontal: 5,
                    }}
                  >
                    <Typography size={10} textType="bold">
                      {item.duration}
                    </Typography>
                  </View>
                </ImageBackground>
                <Typography
                  size={12}
                  style={styles.artistName}
                  textType="bold"
                  numberOfLines={1}
                >
                  {item.title}
                </Typography>
                <View row center style={{ alignItems: "center" }}>
                  <Image
                    source={IMAGES.eye}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                  />
                  <Typography size={9} textType="bold">
                    {" "}
                    {item.favorite_count} views
                  </Typography>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // gap: 20,
  },
  slide: {
    // justifyContent: "center",
    // alignItems: "center",
    // width: 140,
    // margin:20
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginVertical: 15,
    width: "80%",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: -10,
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  artistName: {
    width: screenWidth(45),
    textAlign: "center",
  },
  activeDot: {
    backgroundColor: "#333",
  },
  artistItem: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.45,
    height: 100,
  },
  artistImage: {
    width: 100,
    height: 80,
  },
});

export default VideoCard;
