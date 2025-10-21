import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updatePlaylist } from "../../redux/slice/PlayList/createPlayList";

const { width } = Dimensions.get("window");

interface UpdatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlistId: number;
  currentName: string;
}

const UpdatePlaylistModal: React.FC<UpdatePlaylistModalProps> = ({
  isOpen,
  onClose,
  playlistId,
  currentName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [playlistName, setPlaylistName] = useState(currentName);

  const handleUpdatePlaylist = () => {
    const formData = new FormData();
    formData.append("name", playlistName);
    formData.append("playlist_id", playlistId.toString());

    dispatch(updatePlaylist(formData))
      .unwrap()
      .then(() => {
        setPlaylistName("");
        onClose();
      });
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Update Playlist</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new name"
            placeholderTextColor="#999"
            value={playlistName}
            onChangeText={setPlaylistName}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdatePlaylist}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Update</Text>
            </TouchableOpacity>
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
    width: width * 0.85,
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#555",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  confirmButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1e90ff",
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default UpdatePlaylistModal;
