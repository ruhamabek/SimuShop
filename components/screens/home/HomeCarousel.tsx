import { Animated, Dimensions, FlatList } from "react-native";
import IMG_AD_1 from "@/assets/shooping-bag.png"
import IMG_AD_2 from "@/assets/shopping.png"
import IMG_AD_3 from "@/assets/purchase.png"
import { Image } from "tamagui";
import { useEffect, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";

const images = [IMG_AD_1 , IMG_AD_2, IMG_AD_3]
const {width} =  Dimensions.get("window");

export function HomeCarousel(){
    const scrollX = useSharedValue(0);
    const ref = useRef<FlatList>(null);
    const currentIndex = useRef(0);

    useEffect(() => {
         const interval = setInterval(() => {
         currentIndex.current = (currentIndex.current + 1) % images.length;
         ref.current?. scrollToIndex({
            index: currentIndex.current,
            animated: true
         });
         } , 3000);
         return () => clearInterval(interval);
    } , []);
    return <FlatList 
       ref={ref}
       data={images} horizontal showsHorizontalScrollIndicator={false}
       keyExtractor={(item) => item}
       pagingEnabled
       renderItem={({item}) => (
        <Animated.View style={{width}}> 
            <Image source={{uri: item }} width={"100%"} height={250} key={item} />
        </Animated.View>
       )}
       onScroll={(event) => {
            scrollX.value = event.nativeEvent.contentOffset.x;
       }}
    />
}