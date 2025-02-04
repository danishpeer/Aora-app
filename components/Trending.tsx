// import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
// import React, { useState } from 'react'
// import * as Animatable from 'react-native-animatable'
// import { icons } from '@/constants'
// import {Video, ResizeMode} from 'expo-av'

// const zoomIn : any = {
//     0: {
//         scale: 0.9
//     },
//     1: {
//         scale: 1.1
//     }
// }

// const zoomOut: any = {
//     0: {
//         scale: 1.1
//     },
//     1: {
//         scale: 0.9
//     }
// }

// const TrendingItem = ({activeItem, item}: any) => {
//     const [play, setPlay] = useState(false);

//     return (
//         <Animatable.View className='mr-5' animation={activeItem==item.$id ? zoomIn: zoomOut} duration={500}>
//             {play ? (
//                 <>
//                 <Video source={{uri: item.video}} className='w-52 h-72 rounded-[35px] mt-3 bg-white/10' resizeMode={ResizeMode.CONTAIN} useNativeControls shouldPlay 
//                 onPlaybackStatusUpdate={(status: any) => {
//                         if(status.didJustFinish){
//                             setPlay(false);
//                         }
//                 }}/>
//                 </>
//             ): (
//                <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={()=>{setPlay(true)}}>
//                 <ImageBackground source={{uri: item.thumbnail}} className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40' resizeMode='cover' />
//                <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
//                </TouchableOpacity>
//             )}
//         </Animatable.View>
//     )
// }

// const Trending = ({posts}: {posts: any}) => {
//     const [activeItem, setactiveItem] = useState(posts[0])

//     const handleViewChanged = ({viewableItems}: any) => {
//         if(viewableItems.length>0)
//             setactiveItem(viewableItems[0].key)
//     }

//   return (
//     <FlatList 
//     data={posts}
//     keyExtractor={(item)=> item.$id}
//     renderItem={({item})=>{
//         return (
//         <TrendingItem activeItem={activeItem} item={item} />
//     )}}
//     horizontal
//     onViewableItemsChanged={handleViewChanged}
//     contentOffset={{x: 170, y: 0}}
//     viewabilityConfig={{itemVisiblePercentThreshold: 70}}
//     showsHorizontalScrollIndicator={false}


//     />
//   )
// }

// export default Trending


import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { icons } from "../constants";

const zoomIn:any = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut: any = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      key={item.$id}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(error: any)=> {
            console.log(error);
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y:0 }}
    />
  );
};

export default Trending;