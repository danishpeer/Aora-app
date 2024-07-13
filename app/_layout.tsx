import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import GlobalProvider from '@/context/GlobalProvider';

// it is a temp screen that appears when app is launched
// as an initial loading screen 
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
//   return (
//     <Slot />  //think of it as children
//   )
const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
    useEffect(()=>{
            if(error) throw error;

            //to manage the display duration programmatically
            if(fontsLoaded) SplashScreen.hideAsync();

            if(!fontsLoaded && !error) return;
    }, [fontsLoaded, error])
    return (
        <GlobalProvider>

            
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name="(auth)" options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name="search/[query]" options={{headerShown: false}}></Stack.Screen>
            </Stack>

        </GlobalProvider>
    )
}

export default RootLayout
