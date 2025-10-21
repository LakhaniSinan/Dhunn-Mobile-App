import React, { useState } from "react";
import { Text, View } from "react-native-ui-lib";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { IMAGES } from "../../constants";
import { AudioCard } from "../atoms/AudioCard";
import Accordion from "react-native-collapsible/Accordion";

export const AudioScreen = () => {
  const CONTENT = [
    {
      title: "My Playlist",
    },
    {
      title: "Favourite Songs",
    },
    {
      title: "Recently Played",
    },
  ];

  const [activeSection, setActiveSection] = useState([0]);

  const renderHeader = (section, _, isActive) => {
    return (
      <View style={[styles.header, isActive && styles.active]}>
        <Text style={styles.headerText}>{section.title}</Text>
        <Image
          source={IMAGES.dropdown}
          style={styles.arrowIcon}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderContent = (section: any, _: any, isActive: any) => {
    return (
      <View style={[styles.content, styles.activeContent]}>
        {CONTENT.map((i) => {
          return <AudioCard />;
        })}
      </View>
    );
  };

  const toggleSection = (section: any) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    // <SafeAreaContainer safeArea={false}>
    <Accordion
      sections={CONTENT}
      activeSections={[activeSection]}
      touchableComponent={TouchableOpacity}
      expandMultiple={false}
      renderHeader={renderHeader}
      renderContent={renderContent}
      // duration={400}
      onChange={(sections) => toggleSection(sections[0])}
    />
    // </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "relative",
    backgroundColor: "#888888",
    padding: 20,
    marginBottom: 20,
    bottom: -20,
    zIndex: 999,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    opacity: 0.6,
  },
  headerBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    // blurRadius: 10,
  },
  headerText: {
    fontSize: 16,
    width: "80%",
    fontWeight: "500",
    color: "white",
  },
  content: {
    zIndex: -1,
    borderRadius: 5,
    borderColor: "#2B2B2B",
    borderWidth: 1,
  },
  arrowIcon: {
    width: 12,
    height: 12,
  },
  active: {
    color: "black",
  },
  activeContent: {
    backgroundColor: "#2B2B2B",
    opacity: 0.9,
  },
});
