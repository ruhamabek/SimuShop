import { DefaultButton } from "@/components/shared/DefaultButton"
import { useCart } from "@/context/CartProvider"
import { Product } from "@/types/product"
import { deliveryDate } from "@/utils/date"
import { Pressable } from "react-native"
import { XStack , Image, YStack , Text, Button } from "tamagui"

interface Props{
    product: Product
    onPress: VoidFunction
}


export function ProductCardResult({product, onPress} : Props){
     const {addItem} = useCart()
    return(
        <Pressable onPress={onPress}>
            <XStack height={300} borderColor={"lightgrey"} borderRadius={6} borderWidth={1}>
                 <Image src={ product.imageUrl ?? ""}
                            width={"35%"}
                            height={"100%"}
                            objectFit="contain"
                            bg={"$shadowColor"}
                            borderBottomLeftRadius={5}
                            borderTopLeftRadius={5}
                            p={10}
                   />
                 <YStack width="65%" p={20} gap={10}>
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
                    <Text fontWeight={"bold"}>
                         {deliveryDate(product.deliveryInDays)}
                    </Text>
                    </XStack>
                  <DefaultButton textProps={{fontSize: 14}} onPress={() => addItem(product)} mt={"auto"}>
                         Add to Basket
                  </DefaultButton>
                    
                 </YStack>
            </XStack>
        </Pressable>
    )
}