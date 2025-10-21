import { MenuView } from "@react-native-menu/menu";
import { PropsWithChildren } from "react";
import TrackPlayer, { Track } from "react-native-track-player";
import { match } from "ts-pattern";
import { MediaItem } from "../../redux/slice/Tops/TopsSlice";
import { COLORS, IMAGES, parseDuration } from "../../constants";
import {
  addFavourite,
  addToQueue,
  removeFavourite,
} from "../../redux/slice/Player/mediaPlayerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Alert, Platform, Share } from "react-native";
import { openPlaylistModel } from "../../redux/slice/PlayList//playListModal";
type TrackShortcutsMenuProps = PropsWithChildren<{ track: MediaItem }>;

export const TrackShortcutsMenu = ({
  track,
  children,
}: TrackShortcutsMenuProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = track.is_favorite;
  
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check this out: ${track.file_path}`,
        url: track.file_path, // Optional, some platforms might not use this directly
        title: track.title, // Optional title for iOS
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("URL shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed.");
      }
    } catch (error) {
      console.error("Error while sharing:", error);
      Alert.alert("URL copied to clipboard.");
    }
  };
  const handlePressAction = (id: string) => {
    match(id)
      .with("add-to-favorites", async () => {
        dispatch(addFavourite({ mediaId: track.id, type: "song" }));
      })
      .with("remove-from-favorites", async () => {
        dispatch(removeFavourite({ mediaId: track.id, type: "song" }));
      })
      .with("add-to-queue", async () => {
        await TrackPlayer.add({
          id: track.id.toString(),
          url: track.file_path,
          title: track.title,
          artist: track.artist?.name || "Unknown Artist",
          artwork: track.cover_image,
          duration: parseDuration(track.duration),
        });
        dispatch(addToQueue(track));
      })
      .with("share", async () => onShare())
      .with("add-to-playlist", async () =>
        dispatch(
          openPlaylistModel({
            media_id: track.id,
            is_playlist: track.is_playlist !== null ? true : false,
          })
        )
      )
      .otherwise(() => console.warn(`Unknown menu action ${id}`));
  };

  return (
    <MenuView
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      themeVariant="dark"
      actions={[
        {
          id: "share",
          title: "Share",
          image: Platform.select({
            ios: "share",
            android: "ic_menu_share",
          }),
          imageColor: Platform.OS == "android" ? COLORS.BLACK : "",
        },
        {
          id: isFavorite ? "remove-from-favorites" : "add-to-favorites",
          title: isFavorite ? "Remove from favorites" : "Add to favorites",
          image: Platform.select({
            ios: isFavorite ? "heart.fill" : "heart",
            android: isFavorite ? "heart.fill" : "heart",
          }),
          imageColor: isFavorite
            ? COLORS.PRIMARY
            : Platform.OS == "android"
            ? COLORS.BLACK
            : "",
        },
        {
          id: "add-to-queue",
          title: "Add to Queue",
          image: Platform.select({
            ios: "plus",
            android: "ic_menu_add",
          }),
          imageColor: Platform.OS == "android" ? COLORS.BLACK : "",
        },
        {
          id: "download",
          title: "Download",
          image: Platform.select({
            ios: "download",
            android: "ic_menu_download",
          }),
          imageColor: Platform.OS == "android" ? COLORS.BLACK : "",
        },
        {
          id: "add-to-playlist",
          title: "Add to playlist",
          image: Platform.select({
            ios: "download",
            android: "ic_menu_download",
          }),
          imageColor: Platform.OS == "android" ? COLORS.BLACK : "",
        },
      ]}
    >
      {children}
    </MenuView>
  );
};
