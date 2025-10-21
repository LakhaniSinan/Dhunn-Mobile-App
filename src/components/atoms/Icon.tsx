import * as React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'

type icon_vector =
  | 'FontAwesome'
  | 'Fontisto'
  | 'MaterialCommunityIcons'
  | 'AntDesign'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'MaterialIcons'
  | 'SimpleLineIcons'
  | 'Zocial'
  | 'Octicons'
  | 'Ionicons'
  | 'Foundation'
  | 'Fontisto'
  | 'FontAwesome6Free-Regular'

interface IconProps {
  vector?: icon_vector
  name: string
  size: number
  color: string
  style?: StyleProp<TextStyle>
  onPress?: () => void
  ref?: any
}

// {...props as IconProps}
const Icon = React.forwardRef(
  (
    props: IconProps = {
      vector: 'FontAwesome',
      name: 'email',
      color: 'blue',
      size: 20,
    },
    ref,
  ) => {
    Icon.displayName = 'VectorIcon'
    const _props = { ...props } as IconProps
    delete _props.vector

    switch (props.vector) {
      case 'FontAwesome': {
        return <FontAwesome ref={ref} {..._props} />
      }
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons ref={ref} {..._props} />
      case 'AntDesign':
        return <AntDesign ref={ref} {..._props} />
      case 'Entypo':
        return <Entypo ref={ref} {..._props} />
      case 'EvilIcons':
        return <EvilIcons ref={ref} {..._props} />
      case 'Feather':
        return <Feather ref={ref} {..._props} />
      case 'FontAwesome5':
        return <FontAwesome5 ref={ref} {..._props} />
      case 'FontAwesome6':
        return <FontAwesome6 ref={ref} {..._props} />
      case 'Fontisto':
        return <Fontisto ref={ref} {..._props} />
      case 'Foundation':
        return <Foundation ref={ref} {..._props} />
      case 'Ionicons':
        return <Ionicons ref={ref} {..._props} />
      case 'MaterialIcons':
        return <MaterialIcons ref={ref} {..._props} />
      case 'Octicons':
        return <Octicons ref={ref} {..._props} />
      case 'SimpleLineIcons':
        return <SimpleLineIcons ref={ref} {..._props} />
      case 'Zocial':
        return <Zocial ref={ref} {..._props} />
    }

    return <FontAwesome {..._props} />
  },
)

export default React.memo(Icon)