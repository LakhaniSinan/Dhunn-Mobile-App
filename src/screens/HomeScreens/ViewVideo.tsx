import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header, Typography } from "../../components/atoms";
import { COLORS, IMAGES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const ARTIST_DATA = [
  { id: 1, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
  { id: 2, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
  { id: 3, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
  { id: 4, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
  { id: 5, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
  { id: 6, name: "Wo Larki Khawab \n Mere Dekhti Hai" },
];

const ViewVideo = (props: any) => {
const title = props?.route?.params?.title
  const navigation = useNavigation();
 const renderItem = ({ item }: any) => (
    <View marginV-10 marginR-10>
      <View style={styles.artistItem}>
        <View
          style={{
            position: "absolute",
            right: 10,
            bottom: 5,
            borderWidth: 1,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 5,
            paddingHorizontal: 5,
          }}
        >
          <Typography size={10}>6:10</Typography>
        </View>
        <Image
          source={IMAGES.imageCont}
          style={styles.artistImage}
          resizeMode="contain"
        />
      </View>
      <Typography size={10} style={styles.artistName}>
        {item.name}
      </Typography>
      <View row center style={{ alignItems: "center" }}>
        <Image
          source={IMAGES.eye}
          style={{ width: 15, height: 15 }}
          resizeMode="contain"
        />
        <Typography size={9}> 519 views</Typography>
      </View>
    </View>
  );

  return (
    <SafeAreaContainer safeArea={false}>
      <View marginT-30 paddingH-10 backgroundColor={COLORS.MEHRON}>
        <Header onPressLeft={() => navigation?.toggleDrawer()} />
      </View>
      <View style={{}}>
        <Typography align="center" size={20}>
          {title}
        </Typography>
        <FlatList
          data={ARTIST_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* <TouchableOpacity style={{ marginHorizontal: 3, bottom: -10 }}>
        <Image
          source={IMAGES.footer}
          style={{ height: 80, width: "100%" }}
          resizeMode="contain"
        />
      </TouchableOpacity> */}
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  artistItemContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  artistItem: {
    backgroundColor: "#2B2B2B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.45,
    height: 100,
  },
  artistImage: {
    width: 100,
    height: 80,
  },
  artistName: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default ViewVideo;
