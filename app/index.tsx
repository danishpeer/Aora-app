import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, ScrollView} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return (<Redirect href="/home" />)
  return (
   <SafeAreaView className='bg-primary h-full'>
    <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className='w-full justify-center items-center h-[85vh] px-4'>
            <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
            <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain'/>
            <View className='relative mt-5 '>
                <Text className='text-3xl text-center text-white font-bold'>Discover Endless Possibilities with
                    <Text className='text-secondary-200'> Aora</Text>
                </Text>
                <Image source={images.path} className='absolute w-[136px] h-[15px] -bottom-2 -right-8' resizeMode='contain'/>
            </View>
            <Text className='text-gray-100 mt-7 font-pregular text-center'>
                Where creativity meets innovation: embark on a journey of limitless exploration with Aora
            </Text>
            <CustomButton title='Continue with Email' handlePress={()=> router.push("/sign-in")} containerStyles="w-full mt-7" isLoading={false}  />
        </View>


    </ScrollView>
    <StatusBar backgroundColor='#161622' style='light' />

   </SafeAreaView>
  );
}
