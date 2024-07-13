import { View, FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '@/components/EmptyState'
import {  getUserPosts, signout } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'
import { router } from 'expo-router'


const Profile = () => {
  const {user, setuser, setisLoggedIn} = useGlobalContext();
    const {data: posts} = useAppwrite(() => getUserPosts(user.$id));
  
    const logout = async ()=> {
      await signout();
      setuser(null);
      setisLoggedIn(false);
      router.replace("/sign-in"); // doesn't allow us to go back in contrast to push

    }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
      data={posts}
      ListEmptyComponent={()=> (
       <EmptyState title="No videos found" subtitle="Start by creating one" />)}

      keyExtractor={(item)=> item.$id}
      renderItem={(item)=>  (
        <VideoCard video={item.item} />
      )}
      
      ListHeaderComponent={()=> (
        <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
          <TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
            <Image source={icons.logout} className='w-6 h-6' resizeMode='contain' />
          </TouchableOpacity>
          <View className='w-16 h-16 items-center justify-center border border-secondary rounded-lg'>
              <Image source={{uri: user?.avatar}} className='w-[90%] h-[90%]' resizeMode='cover' />
          </View>
          <InfoBox title={user?.username} containerStyles="mt-5" titleStyles="text-lg" />

          <View className='mt-5 flex-row'>
          <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl" />
          <InfoBox title="1.2k" subtitle="Followers"  titleStyles="text-xl" />
          </View>

        </View>
      )}      
       />
    </SafeAreaView>
  )
}

export default Profile