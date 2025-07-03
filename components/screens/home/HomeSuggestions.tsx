import { Dimensions } from "react-native";
import { Image, ScrollView, Text, YStack } from "tamagui";
import IMG_AD_1 from "@/assets/home-sugg-1.png"
import IMG_AD_2 from "@/assets/home-sugg-2.png"
import IMG_AD_3 from "@/assets/home-sugg-1.png"

const images = [IMG_AD_1 , IMG_AD_2 , IMG_AD_3];

export function HomeSuggestions(){
    return(
             <YStack height={170} width={Dimensions.get("window").width}>
            <ScrollView horizontal mt={-50} 
              showsHorizontalScrollIndicator={false}
            >
                 {images.map((image, index) => (
                     <YStack
                        key={index}
                        bg={"white"}
                        width={150}
                        height={200}
                        borderRadius={5}
                        ml={20}
                        // shadowColor={"$colorShadow"}
                        shadowOffset={{width: 3 , height: 3}}
                        shadowOpacity={0.4}
                        shadowRadius={6}
                     >
                        <Text fontWeight={"bold"} px={10} pt={10} pb={25}>
                             New Arrivals
                        </Text>
                        <Image source={{uri: image}}
                            width="100%"
                            height={150}
                            borderBottomRightRadius={4}
                            borderBottomLeftRadius={4}

                        />
                     </YStack>
                 ))}
            </ScrollView>
    </YStack>
    );

}