import React, { useState } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, IMAGES } from "../../constants";
import { Typography } from "../../components/atoms";
import { View } from "react-native-ui-lib";

const AboutVideo = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => setExpanded(prev => !prev);

  const videoDetails = [
    { label: "Duration", value: "00:05:59" },
    { label: "Language", value: "Saraiki" },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Typography size={18}>About Video</Typography>
        <TouchableOpacity onPress={toggleExpanded} style={styles.iconButton}>
          <Image
            source={IMAGES.dropdown}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
      </View>

      {expanded && videoDetails.map((detail, index) => (
        <View key={index} style={styles.detailRow}>
          <Typography size={16} color={COLORS.PLACEHOLDER}>{detail.label}</Typography>
          <Typography size={16} color={COLORS.PLACEHOLDER}>{detail.value}</Typography>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default AboutVideo;
