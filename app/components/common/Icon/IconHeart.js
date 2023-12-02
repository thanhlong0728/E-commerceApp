import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Constant from '../../../controller/Constant'

const IconHeart = ({ heart }) => {
    let iconName = heart ? 'ios-heart' : 'ios-heart-outline'

    return <Ionicons name={iconName} size={24} color={Constant.COLORS.red} />
}

export default IconHeart
