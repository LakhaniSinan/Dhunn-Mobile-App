import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TouchableOpacity, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header, SerachComponent, Typography } from "../../components/atoms";
import Slider from "../HomeScreens/Slider";
import SectionTitle from "../HomeScreens/SectionTitle";
import ImageCardList from "../HomeScreens/ImageCardList";
import ArtistList from "../HomeScreens/ArtistList";
import SongCard from "../HomeScreens/SongList";
import { COLORS, IMAGES, SCREENS } from "../../constants";
import { AudioScreen } from "../../components/molucule/AudioScreen";
import { useNavigation } from "@react-navigation/native";
import { VideoScreen } from "../../components/molucule/VideoScreen";
import { MovieScreen } from "../../components/molucule/MovieScreen";
import TabList from "../HomeScreens/TabList";
import { FooterItem } from "../../components/atoms/FooterItem";
import { toggleDrawer } from "../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchSearchResults,
  setQuery,
} from "../../redux/slice/Search/searchSlice";
import ShimmerGridCard from "../../components/atoms/ShimmerGridCard";

const SearchScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState(0);
  const navigation = useNavigation();
  const [play, setPlay] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { results, query, pagination, loading } = useSelector(
    (state: RootState) => state.searchSong
  );
  const handleSubmit = (e: any) => {
    dispatch(setQuery(searchQuery));
    dispatch(fetchSearchResults({ query: searchQuery, page: 1 }));
    setSearchQuery("");
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <View
        paddingH-20
        style={{ paddingTop: Platform.OS == "android" ? 20 : 0 }}
      >
        <Header onPressLeft={() => toggleDrawer()} rightIcon2=""/>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "android" ? "height" : "padding"}
        style={{flex:1, paddingHorizontal: 20 }}
      >
        <SerachComponent
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
          onSubmitEditing={handleSubmit}
        />
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => <ShimmerGridCard />)
        ) : (
          <ImageCardList
            customImages={results.filter((i) => i.type == "audio")}
            columns={true}
          />
        )}
      </KeyboardAvoidingView>
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

export default SearchScreen;
