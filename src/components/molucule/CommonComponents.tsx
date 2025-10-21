import { Alert, Image, Platform, StyleSheet } from "react-native";
import { COLORS, IMAGES } from "../../constants";
import { Typography } from "../atoms";
import { commonStyles } from "../../globalStyle";
import { TouchableOpacity, View } from "react-native-ui-lib";

export const VerticalLine = () => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <Image
        source={IMAGES.lineV}
        style={{ width: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};
export const SocialLogin = (props:any) => {
  const { text ,style} = props;
  return (
    <>
      <View row center>
        <View style={commonStyles.lineBar}/>
        <Typography
          size={14}
          style={style}
          color={COLORS.GREY}
        >
          {text}
        </Typography>
        <View style={commonStyles.lineBar}/>

      </View>
    </>
  );
};
export const socialIcon = () => {
  return (
    <View spread row flex center>
    
      <TouchableOpacity
        style={styles.socialIconStyle}
        onPress={() => {
          Alert.alert("", "Facebook App will Active when app will publish");
        }}
      >
        <Image
          source={IMAGES.facebook}
          style={styles.socialIconBorder}
          resizeMode={"cover"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Alert.alert("", "Google App will Active when app will publish");
        }}
        style={styles.socialIconStyle}
      >
        <Image
          source={IMAGES.google}
          style={styles.socialIconBorder}
          resizeMode={"cover"}
        />
      </TouchableOpacity>

      {/* {Platform.OS == "ios" ? ( */}
        <TouchableOpacity
          style={styles.socialIconStyle}
          onPress={() => {
            Alert.alert("", "Apple App will Active when app will publish");
          }}
        >
          <Image
            source={IMAGES.linkdin}
            style={styles.socialIconBorder}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
      {/* ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  bottomView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  socialIconStyle: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  socialIconBorder: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.PRIMARY,
  },
});