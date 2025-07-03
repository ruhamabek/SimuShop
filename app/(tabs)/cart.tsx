import ProductCart from "@/components/screens/cart/ProductCart";
import { DefaultButton } from "@/components/shared/DefaultButton";
import { DeliveryLocation } from "@/components/shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/shared/header/HeaderTabs";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartProvider";
import { router, useNavigation } from "expo-router";
import React, { useEffect} from "react";
import { Alert } from "react-native";
import { Image, ScrollView, Text, XStack, YStack } from "tamagui";

export default function Cart(){
     const { user, isLoading, getToken } = useAuth();
     const navigation = useNavigation();
     const {items , subTotal} = useCart();
     console.log(JSON.stringify(items , null ,2))
     const tabs:HeaderTabsProps['tabs'] = [{
        active: true, title:"Basket" , onPress: () => Alert.alert("Basket"),
     }]

     useEffect(() => {
         navigation.setOptions({
            headerSearchShown: true,
            headerTabsProps: {tabs}
         })
      }, [ navigation.setOptions])
    const onClickAuth = () => router.push("/login");
    return (
        
        <ScrollView flex={1}
             bg={"white"}
             contentContainerStyle={{pb:20}}
        >
            <DeliveryLocation/>
            <YStack flex={1} justifyContent={"center"} alignItems={"center"} 
                 gap={20} px={20}
            >
             
               {items.length ? (
                       <>
                          <XStack alignSelf="flex-start" mt={10}>
                              <Text mr={10} fontSize={26}>
                                  Subtotal:
                              </Text>
                              <Text fontSize={26} fontWeight="bold">
                                {subTotal} Birr
                              </Text>
                          
                          </XStack> {
                            user && (
                                <DefaultButton onPress={() => {}}>
                                         {`Proceed to checkout (${items.reduce((total, item) => total + item.quantity, 0)} item(s))`}
                                </DefaultButton>
                            )}
                            {items.map(item => (
                                 <ProductCart key={item.product.id} {...item}/>
                            ))}
                        </>
               ) : (
                      <>
                    <Image source={require("@/assets/empty-cart.png")}
                        width={280}
                        height={200}
                    />
                    <Text fontWeight={"bold"} fontSize={24}>
                         Your Cart is Empty
                    </Text>
                    <Text color={"lightgray"} fontSize={18}>
                         Your favorite stuff goes here
                    </Text>

                </>
               )}
              
            {!user && (
                <YStack width={"100%"} gap={15} mt={20}>
                      <DefaultButton onPress={onClickAuth}>
                                      Sign In
                     </DefaultButton>
                     <DefaultButton onPress={onClickAuth} variant="secondary">
                                     Create Account
                         </DefaultButton>
                </YStack>
            )}
            </YStack> 
        </ScrollView>

    );
}