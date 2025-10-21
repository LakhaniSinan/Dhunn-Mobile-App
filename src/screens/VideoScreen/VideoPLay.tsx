import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header, Typography } from "../../components/atoms";
import { COLORS, IMAGES, SCREENS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import AboutVideo from "./AboutVideo";
import { navigate, toggleDrawer } from "../../navigation/RootNavigation";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { CollapsableContainer } from "../../components/molucule/CollapsableContainer";
import Icon from "../../components/atoms/Icon";
import { MediaItem } from "../../redux/slice/Tops/TopsSlice";
import {
  addFavourite,
  removeFavourite,
} from "../../redux/slice/Player/mediaPlayerSlice";

const { width } = Dimensions.get("window");

const VideoPlay = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentTrack,
    isPlaying,
    volume,
    mute,
    media_duration,
    currentTime,
    isShuffled,
  } = useSelector((state: RootState) => state.mediaPlayer);
  const [expanded, setExpanded] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("blur", () => {
      setVideoPaused(true);
    });

    // Cleanup function to reset video state on unmount
    return () => {
      setVideoPaused(true);
      unsubscribeFocus();
    };
  }, [navigation]);

  const socialData = [
    { icon: IMAGES.heartLine, title: "1 likes" },
    { icon: IMAGES.eye, title: "41 views" },
    { icon: IMAGES.share, title: "1 shares" },
    { icon: IMAGES.clock, title: "watches" },
  ];

  const QUEUE = [
    { id: 1, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
    { id: 2, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
    { id: 3, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
    { id: 4, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
    { id: 5, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
    { id: 6, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
  ];

  const handleLikeToggle = (i: MediaItem) => {
    i.is_favorite
      ? dispatch(removeFavourite({ mediaId: i.id, type: "song" }))
      : dispatch(addFavourite({ mediaId: i.id, type: "song" }));
  };

  const renderItem = ({ item }: any) => (
    <View marginV-10 marginR-10>
      <View style={styles.artistItem}>
        <View
          style={{
            position: "absolute",
            right: 10,
            bottom: 5,
            borderWidth: 1,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 5,
            paddingHorizontal: 5,
          }}
        >
          <Typography size={10}>6:10</Typography>
        </View>
        <Image
          source={IMAGES.imageCont}
          style={styles.artistImage}
          resizeMode="contain"
        />
      </View>
      <Typography size={10} style={styles.artistName}>
        {item.name}
      </Typography>
      <View row center style={{ alignItems: "center" }}>
        <Image
          source={IMAGES.eye}
          style={{ width: 15, height: 15 }}
          resizeMode="contain"
        />
        <Typography size={9}> 519 views</Typography>
      </View>
    </View>
  );

  return (
    <SafeAreaContainer safeArea={true}>
      <View
        paddingH-20
        style={{ paddingTop: Platform.OS == "android" ? 20 : 0 }}
      >
        <Header onPressLeft={() => toggleDrawer()} />
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View center width={"100%"} height={200} style={{ borderRadius: 20 }}>
            <Video
              source={{ uri: currentTrack.file_path }}
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              controls
              resizeMode="cover"
              paused={isPlaying}
              reportBandwidth
            />
          </View>
          <View center marginV-20>
            <Typography align="center" size={25}>
              {currentTrack.title}
            </Typography>
            <Typography align="center" size={14}>
              {currentTrack.description}
            </Typography>
          </View>

          <View style={styles.socialBarStyle}>
            <View
              row
              style={{
                alignItems: "center",
                gap: 10,
                justifyContent: "space-around",
              }}
            >
              <View row style={{ alignItems: "center", gap: 5 }}>
                <Icon
                  vector="FontAwesome6Free-Regular"
                  name={currentTrack.is_favorite ? "heart" : "heart-o"}
                  size={20}
                  color={COLORS.PRIMARY}
                  onPress={() => handleLikeToggle(currentTrack)}
                />
                <Typography
                  size={14}
                >{`${currentTrack.favorite_count} likes`}</Typography>
              </View>
              <View row style={{ alignItems: "center", gap: 5 }}>
                <Icon
                  vector="FontAwesome6Free-Regular"
                  name={"eye"}
                  size={15}
                  color={COLORS.WHITE}
                  // onPress={toggleFavorite}
                />
                <Typography
                  size={14}
                >{`${currentTrack.recently_played_count} watchs`}</Typography>
              </View>
              <View row style={{ alignItems: "center", gap: 5 }}>
                <Icon
                  vector="FontAwesome6Free-Regular"
                  name={"share"}
                  size={15}
                  color={COLORS.WHITE}
                  // onPress={toggleFavorite}
                />
                <Typography size={14}>{`share`}</Typography>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Typography size={18}>About Video</Typography>
              <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                style={styles.iconButton}
              >
                <Image source={IMAGES.dropdown} style={styles.dropdownIcon} />
              </TouchableOpacity>
            </View>

            <CollapsableContainer expanded={expanded}>
              <View style={styles.detailRow}>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  Artist
                </Typography>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  {currentTrack.artist?.name}
                </Typography>
              </View>
              <View style={styles.detailRow}>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  Release Date :
                </Typography>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  {currentTrack.release_date || "Uncategorized"}
                </Typography>
              </View>
              <View style={styles.detailRow}>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  Record Label Name:
                </Typography>
                <Typography size={16} color={COLORS.PLACEHOLDER}>
                  {currentTrack.racket_label?.name || "Uncategorized"}
                </Typography>
              </View>
            </CollapsableContainer>
          </View>

          {/* <View spread row>
            <Typography size={18}>Queue</Typography>
            <TouchableOpacity onPress={() => navigate(SCREENS.VIEW_VIDEO)}>
              <Image
                source={IMAGES.ViewAll}
                style={{ width: 80, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View> */}

          {/* <FlatList
            data={QUEUE}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          /> */}
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
  socialBarStyle: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: COLORS.BLACK_OPACITY,
  },

  artistItem: {
    backgroundColor: "#2B2B2B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.45,
    height: 100,
  },
  artistImage: {
    width: 100,
    height: 80,
  },
  artistName: {
    marginTop: 5,
    textAlign: "center",
  },
  detailRow: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#231F25",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#2B2B2B",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    alignItems: "center",
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
});

export default VideoPlay;
