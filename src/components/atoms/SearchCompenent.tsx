import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { COLORS, FONTS, FONTSIZE } from "../../constants";
import AdIcon from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";
import { onBack } from "../../navigation/RootNavigation";

export const SerachComponent = (props:any) => {
  const {
    onPressRight,
    onPressLeft = () => onBack(),
    leftIcon = "search1",
    rightIcon = "",
    placeholderText = "Search here",
    rightIconColor = COLORS.BLACK,
    leftIconColor = COLORS.WHITE,
    onChangeText,
    value,
    onSubmitEditing
  } = props;
  return (
    <View
      style={{
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 20,
        flexDirection: "row",
      }}
    >
      {leftIcon && (
        <TouchableOpacity
          onPress={onPressLeft}
          style={{ flex: 0.3, justifyContent: "center" }}
        >
          <AdIcon name={leftIcon} size={18} color={leftIconColor} />
        </TouchableOpacity>
      )}
      <TextInput
        style={{
          flex: 2,
          fontSize: FONTSIZE.XS,
          fontFamily: FONTS.PoppinsBold,
          paddingVertical: 15,
          color:COLORS.WHITE
        }}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
        keyboardType="default"
        returnKeyType="search"
        placeholderTextColor={COLORS.SECONDRY}
        placeholder={placeholderText}
      />

      {rightIcon && (
        <TouchableOpacity
          onPress={onPressRight}
          style={{
            flex: 0.1,
            alignSelf: "center",
            alignItems: "flex-end",
          }}
        >
          <Icon name={rightIcon} size={18} color={rightIconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};
