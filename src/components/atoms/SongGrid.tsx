import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {MediaItem} from '../../redux/slice/Tops/TopsSlice'; // Assuming you have MediaItem type
import SongCard from '../../screens/HomeScreens/SongList';

interface SongGridProps {
  data: MediaItem[];
  onPlay: (track: MediaItem) => void;
  onLike: (track: MediaItem) => void;
  onMore: (track: MediaItem) => void;
  onDownload: (track: MediaItem) => void;
}

const SongGrid: React.FC<SongGridProps> = ({
  data,
  onPlay,
  onLike,
  onMore,
  onDownload,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()} // Ensure unique IDs
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.gridContainer}
      // columnWrapperStyle={styles.row} // Maintain spacing between rows
      renderItem={({item}) => (
        <View style={styles.cardContainer}>
          <SongCard
            track={item}
            onPlay={() => onPlay(item)}
            onLike={() => onLike(item)}
            onMore={() => onMore(item)}
            onDownload={() => onDownload(item)}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 10, // Adjust for overall grid padding
  },
  row: {
    justifyContent: 'space-between', // Ensures proper spacing between columns
    marginBottom: 10, // Spacing between rows
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 5, // Adjust for even spacing between columns
  },
});

export default SongGrid;
