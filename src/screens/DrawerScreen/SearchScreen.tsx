import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {Header, SerachComponent} from '../../components/atoms';
import ShimmerGridCard from '../../components/atoms/ShimmerGridCard';
import {COLORS} from '../../constants';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {toggleDrawer} from '../../navigation/RootNavigation';
import {
  fetchSearchResults,
  setQuery,
} from '../../redux/slice/Search/searchSlice';
import {AppDispatch, RootState} from '../../redux/store';
import ImageCardList from '../HomeScreens/ImageCardList';

const SearchScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const {results, query, pagination, loading} = useSelector(
    (state: RootState) => state.searchSong,
  );
  const [searchQuery, setSearchQuery] = useState(query || '');
  const handleSubmit = (e: any) => {
    dispatch(setQuery(searchQuery));
    dispatch(fetchSearchResults({query: searchQuery || '', page: 1}));
    // setSearchQuery('');
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <View paddingH-20 style={{paddingTop: Platform.OS == 'android' ? 35 : 0}}>
        <Header onPressLeft={() => toggleDrawer()} rightIcon2="" />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'android' ? 'height' : 'padding'}
        style={{flex: 1, paddingHorizontal: 20}}>
        <SerachComponent
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
          onSubmitEditing={handleSubmit}
        />
        {loading ? (
          Array.from({length: 5}).map((_, index) => <ShimmerGridCard />)
        ) : (
          <ImageCardList
            customImages={results.filter(i => i.type == 'audio')}
            columns={true}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
});

export default SearchScreen;
