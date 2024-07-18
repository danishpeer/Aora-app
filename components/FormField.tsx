import { View, Text,TextInput, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

const FormField = ({title, value, handleChangeText, otherStyles, keyboardType, placeholder}: {title: string, value: string, handleChangeText: (e:any)=> void, otherStyles: string, keyboardType?: string, placeholder?:string}) => {
    const [showPassword, setshowPassword] = useState(false)
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary border items-center flex-row'>
        <TextInput className='flex-1 w-full text-white font-psemibold text-base' value={value} placeholder={placeholder} placeholderTextColor="#7b7b8b" onChangeText={handleChangeText} secureTextEntry={title==="Password" && !showPassword} />
        {title==="Password" && (
            <TouchableOpacity onPress={()=> setshowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain'  />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField