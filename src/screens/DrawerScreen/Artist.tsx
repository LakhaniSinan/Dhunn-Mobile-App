import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-ui-lib';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Header, Typography} from '../../components/atoms';
import {COLORS, IMAGES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import ArtistList from '../HomeScreens/ArtistList';
import SectionTitle from '../HomeScreens/SectionTitle';
import {FooterItem} from '../../components/atoms/FooterItem';
import {toggleDrawer} from '../../navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {fetchArtists} from '../../redux/slice/Artist/artistSlice';

const Language = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {groupedArtists, topArtists, loading} = useSelector(
    (state: RootState) => state.artist,
  );

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <SafeAreaContainer safeArea={false}>
      <View marginT-30 paddingH-10 backgroundColor={COLORS.MEHRON}>
        <Header onPressLeft={() => toggleDrawer()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Typography align="center" size={20} style={{marginVertical: 20}}>
          Top Artists
        </Typography>
        <ArtistList artistData={topArtists} columns={true} />
        <Typography align="center" size={20} style={{marginVertical: 20}}>
          All Artists
        </Typography>
        {groupedArtists &&
          Object.entries(groupedArtists).map(
            ([language, artists]) =>
              language !== 'top_artists' && (
                <View key={language}>
                  <Typography size={20} style={{marginVertical: 20}}>
                    {language}
                  </Typography>
                  <ArtistList artistData={artists} columns={true} />
                </View>
              ),
          )}
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
