import { DefaultButton } from "@/components/shared/DefaultButton"
import { useCart } from "@/context/CartProvider"
import { Product } from "@/types/product"
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons"
import { deliveryDate } from "@/utils/date"
import React from "react"
import { XStack, YStack, Image, Text, Button } from "tamagui"


interface Props{
    product : Product
    quantity: number
}
export default function ProdctCart ({product , quantity} : Props){
    const {addItem , removeItem} = useCart();
    return <YStack gap={10}>
         <XStack bg="#f5f5f5" minH={200} minW="90%" >
            <Image src={ product.imageUrl ?? ""}
                    width={"35%"}
                    height={"100%"}
                    objectFit="contain"
                    bg={"$shadowColor"}
                    borderBottomLeftRadius={5}
                    borderTopLeftRadius={5}
                    p={10}
                   />
            <YStack width="65%" p={20} gap={20}>
                     <Text numberOfLines={4} ellipsizeMode="tail">
                                           {product.name}
                                      </Text>
                                      <Text fontSize={24}>
                                           {product.currentPrice} Birr
                                      </Text>
                                      <XStack>
                                      <Text >
                                           {product.deliveryPrice === 0 ? "FREE " :
                                             `${product.deliveryPrice} Birr` } 
                                             {" Delivery "}
                                      </Text>
                                      </XStack>
                        </YStack>       
                    </XStack>
                    <XStack gap={20}>
                         <Button
                             width={100}
                             borderRadius={50}
                             borderWidth={3}
                             borderColor="yellow"
                             onPress={() => addItem(product)}
                          >
                            <Text mr="auto" fontWeight="bold">
                                   {quantity.toString()}
                            </Text>
                            <MCIcon name="plus" size={24} /> 
                         </Button>
                         <Button
                              borderRadius={50}
                              borderWidth={1}
                              borderColor="#fafafa" 
                              onPress={() => removeItem(product)}
                          >
                            Delete
                         </Button>
                    </XStack>
                </YStack>
    
}