import { Alert, Dimensions } from "react-native";
import { getItem } from "../utils/localStorage";

export const BASEURL = "https://dhunn.pk/music_backend/public/api/";

export const screenHeight = (percent: any) => {
  const windowHeight = Dimensions.get("window").height;
  return (windowHeight * percent) / 100;
};

export const screenWidth = (percent: any) => {
  const windowWidth = Dimensions.get("window").width;
  return (windowWidth * percent) / 100;
};

export const loadUserFromStorage = () => {
  const user = getItem("userDetails");
  const token = getItem("token");
  return { user, token };
};

export const parseDuration = (duration: string): number => {
  const parts = duration.split(":").map(Number);
  const [hours, minutes, seconds] = parts.length === 3 ? parts : [0, ...parts];
  return hours * 3600 + minutes * 60 + seconds;
};
