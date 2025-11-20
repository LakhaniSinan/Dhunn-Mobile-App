import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Typography} from '../../components/atoms';
import {MediaItem} from '../../redux/slice/Tops/TopsSlice';
import {handleAudioSong} from '../../utils/function';
import {IMAGES} from '../../constants';

export interface TrackSlidesProps {
  cardStyle?: StyleProp<ViewStyle>;
  customImages: MediaItem[];
  columns?: boolean; // Optional: Number of columns for vertical layout
}

const DownloadedSongsCards: React.FC<TrackSlidesProps> = ({customImages}) => {
  const navigation = useNavigation();

  // Grid Item Renderer for FlatList
  const renderItem = ({item}: {item: MediaItem}) => (
    <TouchableOpacity
      onPress={() => handleAudioSong(item, navigation)}
      style={styles.artistItemContainer}>
      <Image
        source={IMAGES.logo}
        style={{width: 60, height: 60, resizeMode: 'contain'}}
      />
      <Typography textType="bold" numberOfLines={2}>
        {item?.name}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={customImages}
        renderItem={renderItem}
        // keyExtractor={item => item?.name?.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  artistItemContainer: {
    marginVertical: 10,
    gap: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DownloadedSongsCards;
