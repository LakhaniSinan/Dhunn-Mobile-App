import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { IMAGES } from '../../constants';

const FooterPlayer = () => {
  return (
    <View style={styles.playerContainer}>
      <Image source={IMAGES.avatar} style={styles.playerImage} />
      <View style={styles.playerInfo}>
        <Text style={styles.playerSong}>Kithaan Guzzaari Raat</Text>
        <Text style={styles.playerArtist}>Nadeem Abbas Khan Lony Wala</Text>
      </View>
      <View style={styles.playerControls}>
        <Button title="◄" />
        <Button title="❚❚" />
        <Button title="►" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical:20
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  playerSong: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerArtist: {
    fontSize: 12,
    color: '#aaa',
  },
  playerControls: {
    flexDirection: 'row',
  },
});

export default FooterPlayer;
