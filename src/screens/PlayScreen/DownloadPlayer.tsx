import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {Typography} from '../../components/atoms';
import {IMAGES} from '../../constants';

import {commonStyles} from '../../globalStyle';
import AudioPlayerComp from '../../components/atoms/AudioPLayerComp';

const DownloadPlayer = () => {
  return (
    <View spread row marginH-10 gap-20 center>
      <Image
        source={IMAGES.volume}
        style={{width: 30, height: 30}}
        resizeMode="contain"
      />

      <AudioPlayerComp
        showDuration={false}
        showCurrentTime={false}
        width={280}
      />
      <Image
        source={IMAGES.download}
        style={{width: 30, height: 30}}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DownloadPlayer;
