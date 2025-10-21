import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header, Typography } from "../../components/atoms";
import { FooterItem } from "../../components/atoms/FooterItem";
import { navigate, toggleDrawer } from "../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchLanguages } from "../../redux/slice/language/languageSlice";
import LanguagesComp from "../../components/molucule/LanguagesComp";
import { fetchLanguageMedia } from "../../redux/slice/language/languageMediaSlice";
import TrackPlayer from "react-native-track-player";
import { parseDuration, SCREENS } from "../../constants";
import {
  addFavourite,
  playTrack,
  removeFavourite,
} from "../../redux/slice/Player/mediaPlayerSlice";
import { MediaItem } from "../../redux/slice/Tops/TopsSlice";
import TabList from "../HomeScreens/TabList";
import ShimmerCards from "../../components/atoms/ShimmerCards";
import SongCard from "../HomeScreens/SongList";
import SongGrid from "../../components/atoms/SongGrid";

const LanguageDetails = ({ route }: any) => {
  const id = route.params.id;
  const dispatch = useDispatch<AppDispatch>();
  const {
    id: ids,
    name,
    audio,
    movie,
    video,
    loading,
    error,
  } = useSelector((state: RootState) => state.languageMedia);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 0, label: "Audio", key: "audio" },
    { id: 1, label: "Video", key: "video" },
  ];

  useEffect(() => {
    dispatch(fetchLanguageMedia(id));
  }, [dispatch, id]);

  const getActiveData = () => {
    switch (tabs[activeTab].key) {
      case "audio":
        return audio;
      case "video":
        return video;
      case "movie":
        return movie;
      default:
        return [];
    }
  };
  console.log(audio);

  const activeData = getActiveData();

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

  const handleDownload = () => {
    // Download song
  };

  const handleLikeToggle = (i: MediaItem) => {
    i.is_favorite
      ? dispatch(removeFavourite({ mediaId: i.id, type: "song" }))
      : dispatch(addFavourite({ mediaId: i.id, type: "song" }));
  };

  const handleMore = () => {
    // More options
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <View
        paddingH-20
        style={{ paddingTop: Platform.OS == "android" ? 20 : 0 }}
      >
        <Header onPressLeft={() => toggleDrawer()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Typography align="center" size={20}>
          {name}
        </Typography>
        {activeData?.length !== 0 && (
          <View style={{ marginVertical: 10 }}>
            <TabList data={tabs} onSelect={setActiveTab} selected={activeTab} />
          </View>
        )}
        <View marginV-20 flex>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => <ShimmerCards />)
          ) : (
            <SongGrid
              data={activeData}
              onPlay={handlePlay}
              onLike={handleLikeToggle}
              onMore={handleMore}
              onDownload={handleDownload}
            />
          )}

          {activeData?.length === 0 && (
            <View center flex style={{ marginTop: 20 }}>
              <Typography>No Record Found</Typography>
            </View>
          )}
        </View>
      </ScrollView>
      <FooterItem />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default LanguageDetails;
