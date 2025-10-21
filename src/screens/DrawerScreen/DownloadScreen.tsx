import React, { useCallback, useEffect, useState } from "react";
import {
    Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header, Typography } from "../../components/atoms";
import { FooterItem } from "../../components/atoms/FooterItem";
import { toggleDrawer } from "../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchLanguages } from "../../redux/slice/language/languageSlice";
import LanguagesComp from "../../components/molucule/LanguagesComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MediaItem } from "../../redux/slice/Tops/TopsSlice";
import Icon from "../../components/atoms/Icon";
import { COLORS, parseDuration } from "../../constants";
import TrackPlayer, { Track } from "react-native-track-player";
import { playTrack } from "../../redux/slice/Player/mediaPlayerSlice";
import { useFocusEffect } from "@react-navigation/native";

const DownloadScreen = () => {
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
      const [activeTrack, setActiveTrack] = useState<Track | null>(null);
      const dispatch = useDispatch<AppDispatch>();
    

//   const dispatch = useDispatch<AppDispatch>();
//   const { languages, loading, error } = useSelector(
//     (state: RootState) => state.languages
//   );

useEffect(() => {
  console.log('hey');

    // fetchMedia();
    
  }, []);


  useFocusEffect(
    useCallback(() => {
      console.log('running');
      fetchMedia();
    }, [])
  );


    const fetchMedia = async () => {
      try {
        setLoading(true);
        const data = await getAllSavedMedia(); // Fetch data
        setMediaList(data); // Set state with fetched media
        console.log(data,"new")
        addTracksToPlayer(data);
      } catch (err) {
        setError('Failed to load media');
      } finally {
        setLoading(false);
      }
    };

  const addTracksToPlayer = async (tracks) => {
    try {
      let parsedTracks = tracks;
    if (typeof tracks === 'string') {
      parsedTracks = JSON.parse(tracks);
    }
    
  
      // Loop through each track and add it to TrackPlayer
      parsedTracks.forEach((track) => {
        TrackPlayer.add({
          id: track.id.toString(), // Ensure ID is a string
          url: track.file_path,
          title: track.title,
          artist: track.artist?.name || "Unknown Artist", // Fallback for undefined artist
          artwork: track.cover_image,
          duration: track.duration,
          date:track.release_date,
          record_label: track.racket_label?.name

                    // Assuming parseDuration is a utility function for converting the duration
        });
      });
    } catch (error) {
      console.error("Error adding tracks to TrackPlayer:", error);
    }
  };


  const getAllSavedMedia = async (): Promise<MediaItem[]> => {
    const storedIds = await AsyncStorage.getItem('media_ids');
    const ids: string[] = storedIds ? JSON.parse(storedIds) : [];
    const mediaList: MediaItem[] = []; // Temporary list

    for (const id of ids) {
      const item = await AsyncStorage.getItem(`media_${id}`);
      if (item) {
        mediaList.push(JSON.parse(item));
        console.log(item,"is saved");
                                    //  TrackPlayer.add({
                                    //      id: item.id.toString(),
                                    //      url: item.file_path,
                                    //      title: item.title,
                                    //      artist: item.artist?.name || "Unknown Artist",
                                    //      artwork: item.cover_image,
                                    //      duration: parseDuration(item.duration),
                                    //    });
                                   
      
      
                                  };
    }

    return mediaList; // Return the fetched list
  };

  const removeMediaFromStorage = async (mediaId: string) => {
    try {
      // Remove the media item from AsyncStorage
      await AsyncStorage.removeItem(`media_${mediaId}`);
  
      // Get the stored media ids
      const storedIds = await AsyncStorage.getItem('media_ids');
      const ids: string[] = storedIds ? JSON.parse(storedIds) : [];
  
      // Filter out the mediaId from the ids array
      const updatedIds = ids.filter(id => id !== mediaId);
  
      // Update the media ids in AsyncStorage
      await AsyncStorage.setItem('media_ids', JSON.stringify(updatedIds));
      setMediaList((prevList) => prevList.filter(item => item.id.toString() !== mediaId.toString()));
      console.log(`Media item with id ${mediaId} removed successfully.`);
      await TrackPlayer.reset();
    } catch (error) {
      console.error('Failed to remove media item from AsyncStorage:', error);
    }
  };



const changeActiveTrack = async () => {
  const currentTrackId = await TrackPlayer.getCurrentTrack();
  const track = await TrackPlayer.getTrack(currentTrackId);

  setActiveTrack(track);
  console.log(track?.artwork);
}

const tapToPlay = async(trackId: any) =>{
await TrackPlayer.reset();
  console.log(mediaList[0].id)
  // console.log(trackId);
  const trackIndex = mediaList.findIndex((track) => track.id === trackId);
  // if (trackIndex !== -1) {
    // await TrackPlayer.skip(trackIndex); // Skip to the tapped track
    console.log(mediaList[trackIndex].duration,"is duration");

 await TrackPlayer.add({
        id: mediaList[trackIndex].id.toString(),
        url: mediaList[trackIndex].file_path,
        title: mediaList[trackIndex].title,
        artist: mediaList[trackIndex].artist?.name || "Unknown Artist",
        artwork: mediaList[trackIndex].cover_image,
        duration: mediaList[trackIndex].duration,
        date:mediaList[trackIndex].release_date,
        record_label: mediaList[trackIndex].racket_label?.name

      });
      await TrackPlayer.play();

  dispatch(playTrack(mediaList[trackId]));
   console.log('playing');
   
  //  changeActiveTrack();
  // //  handleUpdateTrack(myQueue[trackIndex]);
  //    // This triggers the useEffect if you're watching it         // Start playing the track
  // } else {
  //   console.warn('Track not found in queue');
  // }
}

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
          Downloads
        </Typography>
        {/* <LanguagesComp item={languages}/> */}

          <View gap-10 marginT-20>
                    {mediaList.length > 0 &&
                      mediaList.map((i) => (
                           <TouchableOpacity activeOpacity={0.8} onPress={() => tapToPlay(i.id)}>
                        <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#231F25",
                          borderRadius: 10,
                          marginBottom: 10,
                          padding: 10,
                          borderWidth: 1,
                          borderColor: "#2B2B2B",
                        }}
                      >
                        {/* Left-aligned content */}
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flexShrink: 1 }}>
            <Image
              source={{ uri: i.cover_image }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                resizeMode: "cover",
              }}
            />
            <Typography textType="bold" numberOfLines={2} style={{ flexShrink: 1, fontSize: 15 }}>
              {i.title} 
            </Typography>
          </View>
                      
                        {/* Right-aligned content */}
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                          {/* <TrackShortcutsMenu track={currentTrack}>
                            <Image source={IMAGES.dotsVertical} style={styles.icon} />
                          </TrackShortcutsMenu> */}
                          <Icon
                            vector="Entypo"
                            name="circle-with-minus"
                            color={COLORS.PRIMARY}
                            size={25}
                            onPress={() => removeMediaFromStorage(i.id.toString())}
                          />
                        </View>
                      </View>
                      </TouchableOpacity>
                      ))}
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

export default DownloadScreen;
