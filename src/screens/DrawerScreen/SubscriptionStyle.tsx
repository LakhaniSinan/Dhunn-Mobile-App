import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const authStyles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 100 : 60,
  },
  closeIcon: {
    position: "absolute",
    right: 20,
    top: 50,
  },
  iconSize: {
    width: 30,
    height: 30,
  },
  marginVertical: {
    marginVertical: 20,
  },
  inputContainer: {
    backgroundColor: COLORS.INPUT_VIEW,
    width: "100%",
    borderRadius: 20,
  },
  rememberMeContainer: {
    flex: 1,
    alignItems: "center",
  },
  rememberIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  buttonMargin: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  socialLoginText: {
    textAlign: "center",
    marginHorizontal: 20,
  },
  socialIconsContainer: {
    marginVertical: 40,
  },
  textInput: {

    flex:1,
    alignSelf: "center",
    height: 50,
    width: 30,
    textAlign: "center",
    borderColor: COLORS.GREY,
    borderBottomWidth: 1,
    fontSize: 20,
    color: COLORS.BLACK,
    marginHorizontal:20,

    
  },
});
