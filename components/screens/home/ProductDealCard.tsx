import { Product } from "@/types/product";
import { offPercentage } from "@/utils/number";
import React from "react";
import { Dimensions, Pressable } from "react-native";
import { XStack, YStack, Image, Text } from "tamagui";
interface Props{
    product: Product
    onPress: VoidFunction
}

export function ProductDealCard({product , onPress}: Props){

    return(
          <Pressable onPress={onPress}>
            <YStack
                 width={Dimensions.get("window").width / 2 - 40}
                 height={180}
                 gap={10}
             >
                <XStack p={5} bg={"$shadowColor"} width= "100%" height="80%" borderRadius={4}>
                       <Image src={ product.imageUrl ?? ""}
                            width={"100%"}
                            height={"100%"}
                            objectFit="contain"
                       />
                </XStack>
                <XStack gap={10} justifyContent={"space-between"} alignItems={"center"}>
                         <Text 
                              borderRadius={4}
                              px={6}
                              py={4}
                              bg={"red"}
                              color={"white"}
                              fontWeight={"bold"}
                              fontSize={11}      
                          >
                            {offPercentage(
                                product.currentPrice,
                                product.previousPrice
                            )}% off
                         </Text>
                         <Text fontSize={12} color={"red"}>
                              Limited Deal
                         </Text>
                </XStack>
            </YStack>
          </Pressable>
    );
}