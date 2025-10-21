import React from "react";
import { Text } from "react-native";
import { COLORS, FONTS, FONTSIZE } from "../../constants";

type Props = {
  textType?: 'bold' | 'semiBold' | 'regular' | 'light';
  size?: number;
  color?: string;
  align?: string;
  style?: Object;
  children: any;
  numberOfLines?: number;
  capitalize?: boolean;
  ellipsizeMode?: 'clip' | 'head' | 'middle' | 'tail';
  lineBreakMode?: 'clip' | 'head' | 'middle' | 'tail';
  adjustsFontSizeToFit?: boolean;
  allowFontScaling?: boolean
};

export const Typography = (props: Props) => {

  const {
    textType = 'regular',
    size = FONTSIZE.S,
    color = COLORS.WHITE,
    align = 'left',
    style = {},
    numberOfLines = undefined,
    capitalize = false,
    ellipsizeMode = undefined,
    lineBreakMode = undefined,
    adjustsFontSizeToFit = true,
    allowFontScaling = true
  } = props;

  let textStyle: any = {
    lineHeight: size * 1.6,
    fontSize: size,
    color: color,
    textAlign: align,
    textTransform: capitalize ? 'capitalize' : 'none',
    ...style
  }
  switch (textType) {
    case 'bold':
      textStyle.fontFamily = FONTS.PoppinsBold;
      textStyle.fontWeight = "bold";
      break
    case 'semiBold':
      textStyle.fontFamily = FONTS.PoppinsSemiBold;
      textStyle.fontWeight = "500";
      break
    case 'regular':
      textStyle.fontFamily = FONTS.PoppinsMedium;
      textStyle.fontWeight = "300";
      break
    case 'light':
      textStyle.fontFamily = FONTS.PoppinsRegular;
      textStyle.fontWeight = "300";
      break
    default:
      textStyle.fontFamily = FONTS.PoppinsRegular;
      break
  }

  return (
    <Text style={textStyle} lineBreakMode={lineBreakMode} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} adjustsFontSizeToFit={adjustsFontSizeToFit} allowFontScaling={allowFontScaling} >
      {props.children}
    </Text>
  );
};
