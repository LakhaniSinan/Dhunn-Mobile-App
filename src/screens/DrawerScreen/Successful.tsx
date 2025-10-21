import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Image,
} from "react-native";
import { COLORS, FONTSIZE, IMAGES, SCREENS } from "../../constants";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Button, InputText, Typography } from "../../components/atoms";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { authStyles } from "./SubscriptionStyle";

const Successful = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <View
        flex
        gap-30
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={IMAGES.success}
          style={{ width: 110, height: 110 }}
          resizeMode="contain"
        />
        <Typography size={25}>Successful</Typography>
        <Button
          label="Back To Home"
          onPress={() => {
            navigate(SCREENS.HOME);
          }}
          style={[
            authStyles.buttonMargin,
            { marginHorizontal: 60, width: "70%" },
          ]}
        />
      </View>
    </SafeAreaContainer>
  );
};

export default Successful;
