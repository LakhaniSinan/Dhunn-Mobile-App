import React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { View } from "react-native-ui-lib";
import { onBack } from "../../navigation/RootNavigation";
import Icon from "react-native-vector-icons/Ionicons";

interface BackHeaderProps {
  onPress?: () => void;
}

export const BackHeader: React.FC<BackHeaderProps> = ({ onPress }) => {
  return (
    <View paddingH-0 style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={onPress ?? onBack} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : 0,
    backgroundColor: "transparent",
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  backButton: {
    padding: 0,
  },
  icon: {
    marginHorizontal: 0,
  },
});
