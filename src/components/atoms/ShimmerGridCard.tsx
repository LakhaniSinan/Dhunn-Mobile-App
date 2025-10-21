import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight, screenWidth } from '../../constants';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerGridCard = () => {
  const avatarRef = useRef<InstanceType<typeof ShimmerPlaceholder>>(null);
  const firstLineRef = useRef<InstanceType<typeof ShimmerPlaceholder>>(null);
  const secondLineRef = useRef<InstanceType<typeof ShimmerPlaceholder>>(null);
  const thirdLineRef = useRef<InstanceType<typeof ShimmerPlaceholder>>(null);

  useEffect(() => {
    const facebookAnimated = Animated.stagger(400, [
      avatarRef.current?.getAnimated?.(),
      Animated.parallel([
        firstLineRef.current?.getAnimated?.(),
        secondLineRef.current?.getAnimated?.(),
        thirdLineRef.current?.getAnimated?.(),
      ]),
    ]);

    Animated.loop(facebookAnimated).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ShimmerPlaceholder
          ref={avatarRef}
          style={styles.avatar}
          stopAutoRun
        />
        <View style={styles.textContainer}>
          <ShimmerPlaceholder
            ref={firstLineRef}
            style={styles.firstLine}
            stopAutoRun
          />
          <ShimmerPlaceholder
            ref={secondLineRef}
            style={styles.secondLine}
            stopAutoRun
          />
          <ShimmerPlaceholder
            ref={thirdLineRef}
            style={styles.thirdLine}
            stopAutoRun
          />
        </View>
      </View>
    </View>
  );
};

export default ShimmerGridCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: screenWidth(40), // Fixed width
    height: screenHeight(15), // Fixed height
    borderRadius: 5,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap:20
  },
  firstLine: {
    width: '80%',
    height: 10,
    marginBottom: 8,
  },
  secondLine: {
    width: '60%',
    height: 10,
    marginBottom: 8,
  },
  thirdLine: {
    width: '40%',
    height: 10,
  },
});