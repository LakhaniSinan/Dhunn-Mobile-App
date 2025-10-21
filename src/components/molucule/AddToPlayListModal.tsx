import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  addSongToPlaylist,
  createPlaylist,
  removeSongFromPlaylist,
} from "../../redux/slice/PlayList/createPlayList";
import { closePlaylistModel } from "../../redux/slice/PlayList/playListModal";

const { width } = Dimensions.get("window");

interface AddToPlayListModalProps {
  is_playlist: boolean;
}

const AddToPlayListModal: React.FC<AddToPlayListModalProps> = ({
  is_playlist,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.playlistModal.isOpen);
  const mediaId = useSelector(
    (state: RootState) => state.playlistModal.media_id
  );
  const playlists = useSelector((state: RootState) => state.playList.playlists);
  const [playlistName, setPlaylistName] = useState("");

  const handleAddToSong = (id: number) => {
    const formData = new FormData();
    formData.append("media_id", mediaId);
    formData.append("playlist_id", id.toString());
    console.log(mediaId);
    dispatch(addSongToPlaylist(formData))
      .unwrap()
      .then(() => dispatch(closePlaylistModel()));
  };

  const handleRemoveToSong = (id: number) => {
    const formData = new FormData();
    formData.append("media_id", mediaId);
    formData.append("playlist_id", id.toString());
    console.log(mediaId);
    
    dispatch(removeSongFromPlaylist(formData))
      .unwrap()
      .then(() => dispatch(closePlaylistModel()));
  };

  const handleCreatePlaylist = () => {
    const formData = new FormData();
    formData.append("name", playlistName);
    dispatch(createPlaylist(formData));
    setPlaylistName("");
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => dispatch(closePlaylistModel())}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Add to Playlist</Text>
            <TouchableOpacity
              onPress={() => dispatch(closePlaylistModel())}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Playlists or Create Playlist */}
          <View style={styles.content}>
            {playlists.length > 0 ? (
              <FlatList
                data={playlists}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.playlistList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      is_playlist
                        ? handleRemoveToSong(item.id)
                        : handleAddToSong(item.id)
                    }
                    style={styles.playlistItem}
                  >
                    <Text style={styles.playlistText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.createPlaylistContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Playlist Name"
                  placeholderTextColor="#999"
                  value={playlistName}
                  onChangeText={setPlaylistName}
                />
                <TouchableOpacity
                  onPress={handleCreatePlaylist}
                  style={styles.createButton}
                >
                  <Text style={styles.createButtonText}>Create Playlist</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    padding: 15,
  },
  playlistList: {
    maxHeight: 300,
  },
  playlistItem: {
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 10,
  },
  playlistText: {
    color: "#fff",
    fontSize: 16,
  },
  createPlaylistContainer: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    color: "#fff",
    marginBottom: 10,
  },
  createButton: {
    padding: 10,
    backgroundColor: "#1e90ff",
    borderRadius: 5,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddToPlayListModal;
