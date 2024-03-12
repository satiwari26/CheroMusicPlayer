import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../misc/color'

export default function PlayerButton({iconType, size = 50, iconColor = color.primaryLightBlue, onPress, otherProps }) {
    getIconName = (type) => {
        switch (type) {
        case 'play':
            return 'motion-pause';
        case 'pause':
            return 'motion-play';
        case 'next':
            return 'step-forward-2';
        case 'previous':
            return 'step-backward-2';
        default:
            return 'caretright';
        };
    }
  return (
      <MaterialCommunityIcons onPress={onPress} name={getIconName(iconType)} size={size} color={iconColor} {...otherProps} />
  )
}