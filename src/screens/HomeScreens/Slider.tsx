import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import Swiper from 'react-native-swiper';
import { IMAGES } from '../../constants';
import { BlurView } from '@react-native-community/blur';

const SLIDER_DATA = [
  { id: 1, image: IMAGES.slide3 },
  { id: 2, image: IMAGES.slide3 },
  { id: 3, image: IMAGES.slide3 },
];

const DUMMY_IMAGE = IMAGES.dummy;

const Slider = () => {
  return (
    <View style={styles.sliderContainer}>
      <Swiper
        showsButtons={false}
        showsPagination={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        loop={true}
        autoplay
      >
        {SLIDER_DATA.map((item, index) => (
          <View key={item.id} style={styles.slide}>
            <Image
                source={item.image}
                style={styles.previousImage}
                resizeMode="cover"
              />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
    position: 'relative',
  },
  dotStyle: {
    backgroundColor: '#fff',
    opacity: 0.5,
    top:20
  },
  activeDotStyle: {
    backgroundColor: '#fff',
    top:20
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    position: 'relative',
  },
  // Blurred Previous Image
  previousImageBlur: {
    position: 'absolute',
    left: '-30%', 
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  previousImage: {
    width: '90%', 
    height: '70%', 
    maxWidth:'100%',
    borderRadius: 20,
  },
  // Blurred Next Image
  nextImageBlur: {
    position: 'absolute',
    right: '-30%', 
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  nextImage: {
    width: '60%', // Scale down width
    height: '70%', // Scale down height
    opacity: 0.6,
    borderRadius: 20,
  },
  // Clear Current Image
  currentImage: {
    width: '75%', // Keep the current image size
    height: '100%', // Maintain the original height
    borderRadius: 20,
    zIndex: 1,
  },
});

export default Slider;
