import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header, Typography } from "../../components/atoms";
import { FooterItem } from "../../components/atoms/FooterItem";
import { toggleDrawer } from "../../navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchLanguages } from "../../redux/slice/language/languageSlice";
import LanguagesComp from "../../components/molucule/LanguagesComp";

const Language = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { languages, loading, error } = useSelector(
    (state: RootState) => state.languages
  );

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <SafeAreaContainer safeArea={false}>
      <View
        paddingH-20
        style={{ paddingTop: Platform.OS == "android" ? 20 : 0 }}
      >
        <Header onPressLeft={() => toggleDrawer()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Typography align="center" size={20}>
          Languages
        </Typography>
        <LanguagesComp item={languages}/>
      </ScrollView>
      <FooterItem />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Language;
