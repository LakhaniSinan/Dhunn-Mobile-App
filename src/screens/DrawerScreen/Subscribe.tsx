import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";
import { COLORS, FONTSIZE, IMAGES, SCREENS } from "../../constants";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Button, InputText, Typography } from "../../components/atoms";
import { Image, TouchableOpacity, View } from "react-native-ui-lib";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { authStyles } from "./SubscriptionStyle";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(true);

  return (
    <SafeAreaContainer safeArea={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={authStyles.flex}
      >
        <View row spread>
          <TouchableOpacity onPress={() => onBack()} marginT-50 marginH-20>
            <Image
              source={IMAGES.leftArrow}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onBack()} marginT-50 marginH-20>
            <Image
              source={IMAGES.cross}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View flex marginV-50 marginH-20 spread>
          <Typography
            size={FONTSIZE.M}
            color={COLORS.GREY}
            style={authStyles.marginVertical}
            textType="bold"
            align="center"
          >
            Music App name and logo
          </Typography>
          <View>
            <Typography
              size={FONTSIZE.L}
              color={COLORS.GREY}
              style={authStyles.marginVertical}
              textType="bold"
              align="center"
            >
              Subscribe
            </Typography>
            <View
              style={[
                authStyles.inputContainer,
                { alignSelf: "center", width: "100%" },
              ]}
            >
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="white"
                onChangeText={setEmail}
                value={email}
                keyboardType="phone-pad"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                style={{
                  color: COLORS.WHITE,
                  paddingHorizontal: 20,
                  textAlign: "center",
                }}
              />
            </View>

            <View row marginV-10 style={{}}>
              <TouchableOpacity onPress={() => setCheck(!check)}>
                {check ? (
                  <Image source={IMAGES.tick} style={authStyles.rememberIcon} />
                ) : (
                  <Image
                    source={IMAGES.tick}
                    style={[authStyles.rememberIcon, { tintColor: "#fff" }]}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate(SCREENS.TERMS)}>
              <Typography
                size={FONTSIZE.S}
                color={COLORS.GREY}
                style={{ width: "90%", marginLeft: 10 }}
              >
                I have read and agree to the Terms and Conditions
              </Typography>
              </TouchableOpacity>
            </View>

            <Button
              label="Send Code"
              onPress={() => {
                navigate(SCREENS.OTP);
              }}
              style={[authStyles.buttonMargin, { marginHorizontal: 60 }]}
            />
          </View>
          <View>
            <Typography size={FONTSIZE.L} align="center" color={COLORS.GREY}>
              You Don’t have Account
            </Typography>
            <Button
              label="Register Now"
              onPress={() => navigate("SignUp")}
              style={[authStyles.buttonMargin, { marginHorizontal: 60 }]}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};
export default Subscribe;
