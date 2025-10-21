import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTSIZE, screenWidth } from "../../constants";
import { commonStyles } from "../../globalStyle";
import { Typography } from "./Typography";

interface ButtonProps {
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  style?: object;
  btnStyle?: object;
  isGradient?: boolean;
  rightIcon?: React.ReactNode;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  btnHeight?: number;
  loading?: boolean; // New loading prop
}

export const Button: React.FC<ButtonProps> = ({
  onPress = () => {},
  label = "",
  disabled = false,
  style = {},
  btnStyle = {},
  isGradient = true,
  rightIcon = null,
  textColor = "#fff",
  borderColor = COLORS.BORDER,
  borderWidth = 2,
  borderRadius = 30,
  btnHeight = 50,
  loading = false,
}) => {
  const [preventTap, setPreventTap] = useState(false);

  useEffect(() => {
    if (preventTap) {
      const timeout = setTimeout(() => setPreventTap(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [preventTap]);

  const handlePress = () => {
    if (!loading) {
      onPress();
      setPreventTap(true);
    }
  };

  const ButtonContent = (
    <View
      style={[
        btnStyle,
        {
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
          flexDirection: "row",
          width:screenWidth(85)
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          <Typography color={textColor} size={FONTSIZE.L}>
            {label}
          </Typography>
          {rightIcon}
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      disabled={disabled || preventTap || loading}
      onPress={handlePress}
      activeOpacity={0.8}
      style={style}
    >
      {isGradient ? (
        <LinearGradient
          style={{ borderRadius }}
          colors={["#CF0056", "#600D62"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {ButtonContent}
        </LinearGradient>
      ) : (
        <View
          style={[
            btnStyle,
            styles.button,
            {
              backgroundColor: disabled ? COLORS.WHITE : COLORS.BLACK,
              borderRadius,
              borderColor,
              borderWidth,
              height: btnHeight,
            },
          ]}
        >
          {ButtonContent}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    flexDirection: "row",
    ...commonStyles.boxShadow,
  },
});
