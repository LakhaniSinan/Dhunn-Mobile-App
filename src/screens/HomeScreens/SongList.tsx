import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import {
  COLORS,
  IMAGES,
  screenHeight,
  SCREENS,
  screenWidth,
} from "../../constants";
import { navigate } from "../../navigation/RootNavigation";
import { StopPropagation } from "../../components/atoms/StopPropagation";
import { TrackShortcutsMenu } from "../../components/atoms/TrackShortcutsMenu";
import { MediaItem } from "../../redux/slice/Tops/TopsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import RNFS from "react-native-fs";

interface SongCardProps {
  track: MediaItem;
  onPlay: () => void;
  onDownload?: () => void;
  onLike: () => void;
  onMore: () => void;
}

const SongCard: React.FC<SongCardProps> = ({
  track,
  onPlay,
  onLike,
  onMore,
  onDownload,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleDownload = async (media: MediaItem) => {
    try {
      const fileExtension = media.file_path.split(".").pop() || "file";

      const downloadDest = `${RNFS.DocumentDirectoryPath}/${media.title.replace(
        / /g,
        "_"
      )}.${fileExtension}`;

      const { promise } = RNFS.downloadFile({
        fromUrl: media.file_path,
        toFile: downloadDest,
      });

      const result = await promise;

      // Check the status
      if (result.statusCode === 200) {
        Alert.alert(`File downloaded successfully! Location: ${downloadDest}`);
      } else {
        console.error("Download failed:", result.statusCode);
        Alert.alert("Failed to download the file.");
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("An error occurred while downloading the file.");
    }
  };
  return (
    <ImageBackground
      source={
        track.cover_image !== null
          ? { uri: track.cover_image }
          : IMAGES.cameraCapture
      }
      style={styles.card}
      imageStyle={{ opacity: 0.65, borderRadius: 10 }}
      resizeMode="contain"
    >
      <TouchableOpacity
        onPress={onPlay}
        style={{ flex: 1, justifyContent: "space-between", padding: 5 }}
      >
        <View style={styles.cardContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <TouchableOpacity onPress={() => navigate(SCREENS.AUDIO_PLAY)}>
              <Image source={IMAGES.play} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.songTitle}>{track.duration}</Text>
          </View>
          <StopPropagation>
            <TrackShortcutsMenu track={track}>
              <Image source={IMAGES.dotsVertical} style={styles.icon} />
            </TrackShortcutsMenu>
          </StopPropagation>
        </View>
        <View style={styles.info}>
          <Text style={styles.songTitle}>{track.title}</Text>
          <Text style={styles.artistName}>{track.artist?.name}</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    height: screenHeight(20),
    backgroundColor: "#231F25",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2B2B2B",
    opacity: 0.8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "flex-end",
  },
  songTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  artistName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight:'bold'
  },
  duration: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 20,
  },
  icon: {
    width: 35, // Adjust the size based on your icon dimensions
    height: 35,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#393939",
    borderRadius: 10,
    padding: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SongCard;
