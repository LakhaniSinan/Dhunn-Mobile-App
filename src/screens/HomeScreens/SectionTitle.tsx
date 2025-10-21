import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Typography } from '../../components/atoms/Typography';
import { IMAGES } from '../../constants';

const SectionTitle = ({ title,onPress }:any) => {
  return (
    <View style={styles.titleContainer}>
      <Typography size={20} align="center">
        {title}
      </Typography>
      <TouchableOpacity onPress={onPress}>
      <Image source={IMAGES.ViewAll} style={{width:100,height:25}} resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    flexDirection:"row",
    justifyContent:'space-between'
  },
});

export default SectionTitle;
