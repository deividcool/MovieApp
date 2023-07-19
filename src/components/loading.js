import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../theme';
const {height, width} = Dimensions.get('window')

export default function Loading() {
  return (
    <View style={{
        height:height, 
        width:width,
        position:'absolute',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }}>
      <Progress.CircleSnail thickness={12} size={160} color={theme.background}/>
    </View>
  )
}