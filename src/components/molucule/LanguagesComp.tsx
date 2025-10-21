import React from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { IMAGES, SCREENS } from "../../constants";
import { View } from "react-native-ui-lib";
import { Language } from "../../redux/slice/language/languageSlice";
import { navigate } from "../../navigation/RootNavigation";
const { width } = Dimensions.get("window");

interface LanguagesProp {
  item: Language[];
}

const LanguagesComp: React.FC<LanguagesProp> = ({ item }) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.artistItemContainer}
      onPress={() => navigate(SCREENS.LANGUAGE_DETAILS, { id: item.id })}
    >
      <View style={styles.artistItem}>
        <Image source={IMAGES.languageImg} style={styles.artistImage} />
      </View>
      <Text style={styles.artistName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={item}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      contentContainerStyle={styles.listContainer}
    />
  );
};
export default LanguagesComp;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 0,
  },
  artistItemContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  artistItem: {
    backgroundColor: "#2B2B2B",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    width: width * 0.275,
    height: 100,
  },
  artistImage: {
    width: 50,
    height: 80,
    backgroundColor: "#ccc",
    borderRadius: 25,
  },
  artistName: {
    marginTop: 5,
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
});
