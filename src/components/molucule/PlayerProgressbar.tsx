import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { Typography } from '../atoms'
import { formatSecondsToMinutes } from '../../constants/miscellaneous'
import { COLORS } from '../../constants'

export const PlayerProgressBar = ({ style }: ViewProps) => {
	const { duration, position } = useProgress(250)

	const isSliding = useSharedValue(false)
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	const trackElapsedTime = formatSecondsToMinutes(position)
	const trackRemainingTime = formatSecondsToMinutes(duration - position)

	if (!isSliding.value) {
		progress.value = duration > 0 ? position / duration : 0
	}

	return (
		<View style={style}>
			<Slider
				progress={progress}
				minimumValue={min}
				maximumValue={max}
				containerStyle={{
					height: 7,
					borderRadius: 16,
				}}
				thumbWidth={0}
				renderBubble={() => null}
				theme={{
					maximumTrackTintColor: 'rgba(255,255,255,0.4)',
					minimumTrackTintColor: COLORS.PRIMARY,

				}}
				onSlidingStart={() => (isSliding.value = true)}
				onValueChange={async (value) => {
					await TrackPlayer.seekTo(value * duration)
				}}
				onSlidingComplete={async (value) => {
					// if the user is not sliding, we should not update the position
					if (!isSliding.value) return

					isSliding.value = false

					await TrackPlayer.seekTo(value * duration)
				}}
			/>

			<View style={styles.timeRow}>
				<Typography >{trackElapsedTime}</Typography>

				<Typography >
					{'-'} {trackRemainingTime}
				</Typography>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: 20,
	},
})
