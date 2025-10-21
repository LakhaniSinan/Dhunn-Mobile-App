import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  ScrollView,
} from "react-native";
import { COLORS, FONTSIZE, IMAGES, SCREENS } from "../../constants";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Button, Header, InputText, Typography } from "../../components/atoms";
import { Image, TouchableOpacity, View } from "react-native-ui-lib";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { authStyles } from "./SubscriptionStyle";
import OTPTextView from "react-native-otp-textinput";
import { useNavigation } from "@react-navigation/native";

const SearchPopup = () => {
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(true);
  const navigation = useNavigation();

  return (
    <SafeAreaContainer safeArea={false}>
      <View marginT-30 paddingH-10 backgroundColor={COLORS.MEHRON}>
        <Header onPressLeft={() => navigation?.toggleDrawer()} />
      </View>
      <ScrollView>
        <View margin-20>
         
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default SearchPopup;
