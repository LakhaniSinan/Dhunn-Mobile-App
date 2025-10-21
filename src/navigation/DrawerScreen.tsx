import { useState } from "react";
import { COLORS, IMAGES, SCREENS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, TouchableOpacity } from "react-native-ui-lib";
import { Platform, StyleSheet } from "react-native";
import { navigate, reset, toggleDrawer } from "./RootNavigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/slice/User/userSlice";
import Icon from "../components/atoms/Icon";

export const CustomDrawerContent = (props: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState(SCREENS.HOME);

  const drawerItems = [
    {
      name: SCREENS.HOME,
      label: "Home",
      icon: IMAGES.home,
    },
    {
      name: SCREENS.MY_LIBRARY,
      label: "My Library",
      icon: IMAGES.library,
    },
    {
      name: SCREENS.LANGUAGE,
      label: "Language",
      icon: IMAGES.language,
    },
    {
      name: SCREENS.ARTIST,
      label: "Artists",
      icon: IMAGES.artist,
    },
    {
      name: SCREENS.SEARCH,
      label: "Search",
      icon: IMAGES.SearchImg,
    },
  ];

  const handleItemPress = (screenName: string) => {
    setActiveScreen(screenName);
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS == 'ios' ? 50 : 40, paddingHorizontal: 20 }}>

      <TouchableOpacity
        onPress={() => toggleDrawer()}
        style={styles.crossButton}
      >
        <Image source={IMAGES.cross} style={styles.crossIcon} />
      </TouchableOpacity>

      <View style={styles.drawerItemsContainer}>
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleItemPress(item.name)}
            style={styles.drawerItem}
          >
            <Image
              source={item.icon}
              style={[
                styles.icon,
                {
                  tintColor:
                    activeScreen === item.name ? COLORS.PRIMARY : COLORS.WHITE,
                },
              ]}
            />
            <Text
              style={[
                styles.drawerItemText,
                {
                  color:
                    activeScreen === item.name ? COLORS.PRIMARY : COLORS.WHITE,
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => dispatch(logoutUser())}
          style={[styles.drawerItem, { gap: 20 }]}
        >
          <Icon
            vector="MaterialIcons"
            name="logout"
            size={25}
            color="#fff"
          />
          {/* <Image
            source={item.icon}
            style={[
              styles.icon,
              {
                tintColor:
                  activeScreen === item.name ? COLORS.PRIMARY : COLORS.WHITE,
              },
            ]}
          /> */}
          <Text
            style={{ color: COLORS.WHITE }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  crossButton: {
    alignSelf: "flex-start",
    padding: 10,
  },
  crossIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.WHITE,
  },
  drawerItemsContainer: {
    marginTop: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 10
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',

  },
  drawerItemText: {
    fontSize: 16,
  },
  appInfoContainer: {
    marginTop: 40,
  },
  appTitle: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appDescription: {
    color: COLORS.WHITE,
    fontSize: 10,
    lineHeight: 20,
    marginBottom: 20,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialIcon: {
    width: 200,
    height: 30,
  },
});