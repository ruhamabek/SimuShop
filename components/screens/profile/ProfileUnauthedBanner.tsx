import { Dimensions } from "react-native";
import { Image, Text, XStack, YStack } from "tamagui";

const items = {
    box: {
        icon: require("@/assets/unbox.png"),
        text: "Check order status and track."
    },
    bag: {
        icon: require("@/assets/bag.png"),
        text: "Browse your essentials and past orders."
    },
    receipt: {
        icon: require("@/assets/receipt.png"),
        text: "Create lists with items you desire."
    },

}

export function ProfileUnauthedBanner(){
       return (
             <YStack mx={24} gap={60} alignItems={"flex-start"}>
                      {Object.entries(items).map(([_ , {icon , text}])=>(
                        <XStack key={icon} justifyContent={"flex-start"} alignItems={"center"} gap={10}>
                            <Image source={icon} width={60} height={60} />
                            <Text fontSize={20} maxWidth={Dimensions.get("window").width - 100 }>{text}</Text>
                        </XStack>
                      ))}
             </YStack>
       );
}