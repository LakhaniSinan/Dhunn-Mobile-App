import React, { useState } from "react";
import { Text, View } from "react-native-ui-lib";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { commonStyles } from "../../globalStyle";
import { COLORS, IMAGES } from "../../constants";
import { Typography } from "../atoms";
import { AudioCard } from "../atoms/AudioCard";
import Accordion from "react-native-collapsible/Accordion";
import { VideoCard } from "../atoms/VideoCard";

export const MovieScreen = () => {
  const CONTENT = [
    {
      title: "My Movie",
    },
    {
      title: 'Watch Later',
    },
    {
      title: 'Downloads',
    },
    {
      title: 'Recently Watch',
    },
   
  ];

  const [activeSection, setActiveSection] = useState(null);

  const renderHeader = (section, _, isActive) => {
    return (
      <View style={[styles.header, isActive && styles.active]}>
        <Text style={styles.headerText}>{section.title}</Text>
        <Image
          source={isActive ? IMAGES.dropdown : IMAGES.dropdown}
          style={styles.arrowIcon}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderContent = (section: any, _: any, isActive: any) => {
    return (
      <View style={[styles.content, isActive && styles.active]}>
           {
            CONTENT.map((i)=>{
              return(
                <VideoCard />
              )
            })
           }
      </View>
    );
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
      <Accordion
        sections={CONTENT}
        activeSections={[activeSection]}
        touchableComponent={TouchableOpacity}
        expandMultiple={false}
        renderHeader={renderHeader}
        renderContent={renderContent}
        duration={400}
        onChange={(sections) => toggleSection(sections[0])}
      />
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
    opacity:0.6
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
    opacity:0.9
  },
});

