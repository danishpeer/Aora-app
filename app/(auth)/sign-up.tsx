import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignUp = () => {
  const [form, setform] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setisSubmitting] = useState(false)
  const {setuser, setisLoggedIn} = useGlobalContext();

  const submit = async () => {
    if(!form.username || !form.email || !form.password){
        Alert.alert('Error', 'Please Fill in all fields')
    }
    setisSubmitting(true)
    try {
        const result = await createUser(form.email, form.password, form.username);

          // set the username for global context
          setuser(result)
          setisLoggedIn(true);
  

        // set the username for global context
        router.replace('/home')
    } catch (error: any) {
        Alert.alert('Error', error.message)
        
    }
    finally{
        setisSubmitting(false);
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-[85vh] px-4 my-6'>
            <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
            <Text className='text-white text-2xl text-semibold mt-10 font-psemibold'>Sign up to Aora</Text>
            <FormField 
                title="Username"
                value={form.username}
                handleChangeText={(e : any) => setform({...form, username: e})}
                otherStyles="mt-7"
            />
            <FormField 
                title="Email"
                value={form.email}
                handleChangeText={(e : any) => setform({...form, email: e})}
                otherStyles="mt-7"
                keyboardType="email-address"
            />
             <FormField 
                title="Password"
                value={form.password}
                handleChangeText={(e : any) => setform({...form, password: e})}
                otherStyles="mt-7"
            />
            <CustomButton title='Sign up' handlePress={submit} containerStyles='mt-7' isLoading={isSubmitting}  />
            <View className='justify-center pt-5 flex-row'>
                <Text className='text-lg font-pregular text-gray-100'>Have an account already? </Text>
                <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>

            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp