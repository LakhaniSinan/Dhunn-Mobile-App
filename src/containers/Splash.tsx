import {
  View,
  Text,
  Animated,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useRef } from "react";
import SafeAreaContainer from "./SafeAreaContainer";
import { IMAGES } from "../constants";
import { useSelector } from "react-redux";

const Splash = (props) => {
  // const navigation = useNavigation();
  const { isLoggedIn } = useSelector((state) => state.user);
  console.log("isLoggedIn", isLoggedIn);

  return (
    <SafeAreaContainer safeArea={false}>
      <ImageBackground style={{ flex: 1 }} source={IMAGES.bkImg}>
        <View style={styles.container}>
          <Image
            animation={"bounceInDown"}
            duration={6000}
            source={IMAGES.fullLogo}
            style={styles.bgImg}
            resizeMode="contain"
          />

          {/* <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: 80,
            }}
          >
            <Image
              source={IMAGES.name}
              style={{ height: 100, width: 200 }}
              resizeMode="contain"
            />
          </View> */}
        </View>
      </ImageBackground>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImg: {
    width: 300,
    height: 350,
  },
  box: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
});

export default Splash;

{
  /* <View style={{ flexDirection: "row" }}>

<Animatable.Image
  animation={"fadeInRightBig"}
  duration={5000}
  source={IMAGES.textCMU}
  resizeMode="contain"
/>
</View> */
}