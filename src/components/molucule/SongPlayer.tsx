import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install react-native-vector-icons
import { IMAGES } from '../../constants';

const SongPlayer = () => {
  const handlePrevious = () => {
    console.log('Previous song');
  };

  const handlePlayPause = () => {
    console.log('Play or Pause song');
  };

  const handleNext = () => {
    console.log('Next song');
  };

  const handleFavorite = () => {
    console.log('Toggle favorite');
  };

  const handleExpand = () => {
    console.log('Expand or collapse player');
  };

  return (
    <View style={styles.container}>
      {/* Album Art */}
      <Image
        source={IMAGES.avatar}
        style={styles.albumArt}
        resizeMode='contain'
      />

      {/* Song Info */}
      <View style={styles.songInfoContainer}>
        <Text style={styles.songTitle}>Kithaan Guzaari Raat</Text>
        <Text style={styles.artistName}>Nadeem Abbas Khan Lonay Wala</Text>
      </View>

      {/* Playback Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handlePrevious}>
          <View style={styles.controlButton}>
            <Icon name="play-skip-back" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <View style={styles.controlButton}>
            <Icon name="play" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <View style={styles.controlButton}>
            <Icon name="play-skip-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavorite}>
          <Icon name="heart-outline" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleExpand}>
          <Icon name="chevron-up" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    flex:1
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  songInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#bbb',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#E91E63', // Pink color for buttons
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default SongPlayer;
