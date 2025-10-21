import React, { Component, useContext, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { COLORS, screenHeight, screenWidth } from "../../constants";

const TabList = (props: any) => {
  const { data = [], onSelect = () => { }, selected = 0, width=screenWidth(20) } = props;
  return (
    <View style={styles.tabView}>
      {data.map((item: any, i: any) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.activeTabText,
            {
              backgroundColor: selected == i ? COLORS.PRIMARY : '#49001E',
              borderColor: "red",
              borderWidth: 1,
              width:width
            },
          ]}
          onPress={() => {
            onSelect(i)
          }}
        >
          <Text extraSmall12 semibold color={"#fff"}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap:10
  },
  activeTabText: {
    width: screenWidth(20),
    height:screenHeight(3.5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  tabText: {
    color: "#000",
  },
});

export default TabList;
