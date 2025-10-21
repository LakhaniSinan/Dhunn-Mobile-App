import React from "react";
import { View, TextInput, Platform } from "react-native";
import { COLORS, FONTS, FONTSIZE } from "../../constants";
import { Typography } from "./Typography";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { commonStyles } from "../../globalStyle";

export const InputText = (props:any) => {

  const {
    title = null,
    error,
    placeholder,
    placeholderColor = COLORS.WHITE,
    onChangeText = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onKeyPress = () => {},
    value,
    autoCapitalize,
    keyboardType= 'default',
    returnKeyType = 'done',
    inputRef = (input) => {},
    onSubmitEditing = () => {},
    secureTextEntry = false,
    autoFocus = false,
    // maxLength = 100,
    maxLength = props.multiline == true ? 255 : 100, 
    style = {},
    cardStyle = {},
    leftIconName = 'question',
    leftIconVisibility = false,
    leftIcon = null,
    rightIcon = null,
    multiline = false,
    editable = true,
  } = props;

  return (
    <View style={ style }>
      { title && <Typography textType={'light'} size={14} color={ COLORS.PLACEHOLDER }>
        { title }
      </Typography>}

      <View style={[ commonStyles.inputView, cardStyle]}>
        {leftIconVisibility && <View style={ commonStyles.iconView }>
          <Icon name={ leftIconName } size={22} color={COLORS.SECONDRY} />
        </View>}
        
        { leftIcon }
        <TextInput
        style={{
            fontSize: FONTSIZE.S,
            fontFamily: FONTS.PoppinsRegular,
            flex: 1,
            // width:200,
            padding: 10,
            color: COLORS.WHITE,
            marginVertical: Platform.OS == 'ios' ? 20 : 0,
            textAlign:"center"
          }}
          placeholder={ placeholder }
          placeholderTextColor={ placeholderColor }
          underlineColorAndroid="transparent"
          onChangeText={ onChangeText }
          onKeyPress={ onKeyPress }
          value={ value }
          autoCapitalize={ autoCapitalize }
          keyboardType={ keyboardType }
          returnKeyType={ returnKeyType }
          blurOnSubmit={false}
          maxLength={ maxLength }
          ref={ inputRef }
          onSubmitEditing={ onSubmitEditing }
          secureTextEntry={ secureTextEntry }
          autoFocus={ autoFocus }
          onFocus={ onFocus }
          onBlur={ onBlur }
          multiline={ multiline }
          editable={ editable }
        />
        { rightIcon }
      </View>
      {/* { error != "" && <Typography numberOfLines={3} style={{ width: '75%', alignSelf: 'flex-end',margin:10 }} color={COLORS.WHITE} size={FONTSIZE.S} textType="light" align="right">
        { error }
      </Typography>} */}
    </View>
  );
};
