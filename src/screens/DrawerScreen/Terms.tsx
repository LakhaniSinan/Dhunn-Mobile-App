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

const Terms = () => {
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
          <Typography align="center" size={22}>
            Terms of Service
          </Typography>
          <Typography align="left" size={12}>
            Kindly confer to these terms of service and read carefully. They
            show that the nature of the website and the rules and regulations
            associated with it are of great significance. Along with that, we
            have reverence for the rights of all organizations and individuals.
            In case of any questions or confusions, please do not hesitate to
            reach out to us. {"\n"} {"\n"} Description of Koyal.pk Platform,
            Service & Account 1.1 Huge collection of Pakistani dramas, shorts
            and regional songs of top artists categorized in the forms of
            sagaciously curated playlists for different mood or genre. All
            streaming is offered for free, whereas downloading and setting
            caller tuner is paid. 1.2 By accessing and/or using our The Service,
            without being logged into Koyal.pk account, you will be hereinafter
            a “Visitor”. A guest can only access the site and listen to the
            content. In case you're logged in as a registered user, by making an
            account or signing up on the service (collectively the “Account”)
            for yourself and/or on behalf of the entity you're authorized to act
            on behalf of, you will be named as a “Registered User”. In either
            case (Logged in or not) you will be named as a “User” 1.3 As a
            Registered User, you will have the privilege to access extra
            features of the Services such as being able to share the content on
            social media platforms (Facebook and etc.) {"\n"} {"\n"}
            {"\n"}
            3. Our Content & Copyrights 3.1 We give you the most recent,
            exclusive and revocable right to access and use the services, which
            is conditioned on your compliance with the Terms. {"\n"}
            6. Streaming Policy 6.1 Koyal provides free streaming to all users
            without any subscription charges on devices which support streaming
            services.   7. Smart Tune 7.1 Only Telenor users can set a smart
            tune @Rs 1.5+T/Day and content charges of Rs 3+T/track. These
            charges will be deducted from their Telenor balance.
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Terms;
