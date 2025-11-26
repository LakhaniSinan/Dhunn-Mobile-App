import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import Icon from '../atoms/Icon';
import {COLORS, IMAGES} from '../../constants';

type PlayerControlsProps = {
  style?: ViewStyle;
};

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
  containerSize?: number;
};

export const PlayerControls = ({style}: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton iconSize={50} />

        <PlayPauseButton iconSize={24} containerSize={50} />

        <SkipToNextButton iconSize={50} />
      </View>
    </View>
  );
};

export const PlayPauseButton = ({
  style,
  iconSize = 30,
  containerSize = 30,
}: PlayerButtonProps) => {
  const {playing} = useIsPlaying();

  return (
    <View style={[{height: iconSize}, style, {alignSelf: 'flex-start'}]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
        style={{
          backgroundColor: COLORS.PRIMARY,
          height: containerSize,
          width: containerSize,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}>
        {/* <Image
          source={playing ? IMAGES.pause : IMAGES.play}
          style={{width: 60, height: 60, resizeMode: 'contain'}}
        /> */}
        <Icon
          vector="FontAwesome6Free-Regular"
          name={playing ? 'pause' : 'play'}
          size={iconSize}
          color={COLORS.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({iconSize = 30}: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}>
      <Image
        source={IMAGES.playright2}
        style={{width: iconSize, height: iconSize, resizeMode: 'contain'}}
      />
      {/* <Icon
        vector="FontAwesome6Free-Regular"
        name="forward"
        size={iconSize}
        color={COLORS.WHITE}
      /> */}
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({iconSize = 30}: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}>
      <Image
        source={IMAGES.playleft2}
        style={{width: iconSize, height: iconSize, resizeMode: 'contain'}}
      />
      {/* <Icon
        vector="FontAwesome6Free-Regular"
        name={'backward'}
        size={iconSize}
        color={COLORS.WHITE}
      /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
});
