import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {IMAGES, screenHeight, SCREENS, screenWidth} from '../../constants';
import {navigate, replace} from '../../navigation/RootNavigation';
import {Artist} from '../../redux/slice/Home/homeSlice';
import {Typography} from '../../components/atoms';

export interface ArtistSlidesProps {
  cardStyle?: StyleProp<ViewStyle>;
  artistData: Artist[];
  columns?: boolean;
}

const ArtistList: React.FC<ArtistSlidesProps> = ({artistData}) => {
  const renderItem = ({item}: {item: Artist}) => (
    <TouchableOpacity
      onPress={() => navigate(SCREENS.ARTIST_DETAILS, {artistId: item.id})}
      style={styles.artistItemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={item?.image ? {uri: item.image} : IMAGES.userImg}
          style={styles.artistImage}
        />
      </View>
      <Typography style={styles.artistName} numberOfLines={2} textType="bold">
        {item?.name}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={artistData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.image}
        horizontal
        showsHorizontalScrollIndicator={false}
        // numColumns={2} // Dynamic number of columns
        // columnWrapperStyle={styles.columnWrapper} // Add padding between rows
        // contentContainerStyle={styles.flatListContent}
        // style={{ flex:1,}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 10,
  },
  artistItemContainer: {
    margin: 10,
    alignItems: 'center',
  },
  artistItem: {
    borderRadius: 10,
    alignItems: 'center',
  },
  artistImage: {
    width: '100%',
    height: screenHeight(15),
    resizeMode: 'cover',
  },
  artistName: {
    marginTop: 5,
    width: screenWidth(45),
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageContainer: {
    width: screenWidth(35), // Fixed width
    height: screenWidth(35), // Fixed height
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#231F25', // Add a background color for better UX
    borderWidth: 1,
    borderColor: '#2B2B2B',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  inactiveDot: {
    backgroundColor: '#888',
  },
});

export default ArtistList;
