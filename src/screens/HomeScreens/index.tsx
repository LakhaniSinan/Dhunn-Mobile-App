import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header, Typography } from "../../components/atoms";
import Slider from "./Slider";
import SectionTitle from "./SectionTitle";
import ImageCardList from "./ImageCardList";
import ArtistList from "./ArtistList";
import SongCard from "./SongList";
import { COLORS, IMAGES, parseDuration, SCREENS } from "../../constants";
import TabList from "./TabList";
import { navigate, toggleDrawer } from "../../navigation/RootNavigation";
import { FooterItem } from "../../components/atoms/FooterItem";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchHomeData } from "../../redux/slice/Home/homeSlice";
import { fetchPlaylists } from "../../redux/slice/PlayList/createPlayList";
import { fetchTopMedia, MediaItem } from "../../redux/slice/Tops/TopsSlice";
import {
  addFavourite,
  playTrack,
  removeFavourite,
} from "../../redux/slice/Player/mediaPlayerSlice";
import TrackPlayer from "react-native-track-player";
import ShimmerCards from "../../components/atoms/ShimmerCards";
import ShimmerGridCard from "../../components/atoms/ShimmerGridCard";
import SongGrid from "../../components/atoms/SongGrid";
import AddToPlayListModal from "../../components/molucule/AddToPlayListModal";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    audio,
    video,
    movie,
    loading: topLoading,
    error: topError,
  } = useSelector((state: RootState) => state.topMedis);
  const {
    newRelease,
    videoSongs,
    trendingSongs,
    topArtists,
    pickYourMode,
    loading,
    error,
  } = useSelector((state: RootState) => state.home);
  const { is_playlist } = useSelector(
    (state: RootState) => state.playlistModal
  );
  const tabs = [
    { id: 0, label: "Audio", key: "audio" },
    { id: 1, label: "Video", key: "video" },
  ];
  useEffect(() => {
    dispatch(fetchTopMedia());
    dispatch(fetchHomeData());
    dispatch(fetchPlaylists());
  }, []);

  const [activeTab, setActiveTab] = useState(0);

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
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 5) {
      return "Good Night"; // or "Late Night"
    } else if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
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
          {/* <View height={150} marginB-60 marginT-10>
            <Slider />
          </View> */}
          <View marginT-20 flex-1 center row marginB-15>
            <Image source={IMAGES.logo} style={{ width: 150, height: 100,resizeMode:'contain' }} />
            <View marginB-10>
              <View  center>
                <Typography size={20} color={COLORS.WHITE}>
                  {getGreeting()}
                </Typography>
              </View>
              <View  center>
                <Typography size={20} color={COLORS.WHITE}>
                  Welcome to Dhun
                </Typography>
              </View>
            </View>
          </View>
          <View marginB-20 paddingH-10>
            <Typography size={20} color={COLORS.WHITE}>
              Top Songs
            </Typography>
          </View>
          <TabList data={tabs} onSelect={setActiveTab} selected={activeTab} />
          <SongGrid
            data={activeData}
            onPlay={handlePlay}
            onLike={handleLikeToggle}
            onMore={handleMore}
            onDownload={handleDownload}
          />
          {loading ? (
            <ShimmerGridCard />
          ) : (
            <React.Fragment>
              <View marginV-10>
                <SectionTitle
                  title="New Releases"
                  onPress={() =>
                    navigate(SCREENS.VIEW, {
                      title: "New Releases",
                      type: "new_release",
                    })
                  }
                />
              </View>

              <ImageCardList customImages={newRelease} />
            </React.Fragment>
          )}
          {loading ? (
            <ShimmerGridCard />
          ) : (
            <React.Fragment>
              <View marginV-10>
                <SectionTitle
                  title="Video Songs"
                  onPress={() =>
                    navigate(SCREENS.VIEW, {
                      title: "Video Songs",
                      type: "video_song",
                    })
                  }
                />
              </View>

              <VideoCard customImages={videoSongs} />
            </React.Fragment>
          )}
          {loading ? (
            <ShimmerGridCard />
          ) : (
            <React.Fragment>
              <View marginV-10>
                <SectionTitle
                  title="Top Artists"
                  onPress={() =>
                    navigate(SCREENS.VIEW, {
                      title: "Top Artists",
                      type: "top_artists",
                    })
                  }
                />
              </View>

              <ArtistList customImages={topArtists} />
            </React.Fragment>
          )}
          {loading ? (
            <ShimmerGridCard />
          ) : (
            <React.Fragment>
              <View marginV-10>
                <SectionTitle
                  title="Trending Songs"
                  onPress={() =>
                    navigate(SCREENS.VIEW, {
                      title: "Trending Songs",
                      type: "trending_song",
                    })
                  }
                />
              </View>
              <ImageCardList customImages={trendingSongs} />
            </React.Fragment>
          )}
          {loading ? (
            <ShimmerGridCard />
          ) : (
            <React.Fragment>
              <View marginV-10>
                <SectionTitle
                  title="Pick Your Mood"
                  onPress={() =>
                    navigate(SCREENS.VIEW, {
                      title: "Pick Your Mood",
                      type: "pick_your_mode",
                    })
                  }
                />
              </View>
              <ImageCardList customImages={pickYourMode} />
            </React.Fragment>
          )}
        </ScrollView>
      </View>
      <AddToPlayListModal is_playlist={is_playlist} />
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

export default Home;
