import { Product } from "@/types/product";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons"
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { Button, Dialog, Image, ScrollView, Text, View, XStack, YStack } from "tamagui";
import { offPercentage } from "@/utils/number";
import { deliveryDate } from "@/utils/date";
import { DefaultButton } from "@/components/shared/DefaultButton";
import { FlatList } from "react-native";
import { useCart } from "@/context/CartProvider";

export default function ProductScreen() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity , setQuantity] = useState(1);
    const [selectOpen , setSelectOpen] = useState(false);
    const {addItem} = useCart();
    const fetchProduct = useCallback(async () => {
        if (!id) {
            console.log("No ID in search params");
            return;
        }

        console.log("Fetching product with id:", id);

        try {
            const documentSnapshot = await firestore()
                .collection('1') // Use your actual collection name here
                .doc(id as string)
                .get();

            if (documentSnapshot.exists()) {
                const data = documentSnapshot.data();
                console.log("Product data from Firestore:", data);
                setProduct({ id: documentSnapshot.id, ...data } as Product);
            } else {
                console.warn("No product found in Firestore for ID:", id);
                router.back();
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    const onViewType = (viewType: "3D" | "AR") => {
        router.push(`/product/${viewType}?modelUrl=${product?.model3DUrl}`)
    }

    const onSelectQuantity = (num: number) => {
        setQuantity(num);
        setSelectOpen(false)
    }

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!product) {
        return <Text>Product not found</Text>;
    }

    console.log("Rendering product:", product);

    return (<>

        <ScrollView flex={1} gap={20} bg={"white"} p={20}>
            <Text color={"black"}>
                {product.name}
            </Text>
            <Image source={{uri: product.imageUrl ?? ""}}
                 height={300}
                 objectFit="contain"
             />
             <XStack justifyContent={"space-between"} my={20}>
                   {product.model3DUrl && (
                      <>
                            {['3D' , 'AR'].map((viewType) => (
                               
                                <Button
                                    key={viewType}
                                    borderWidth={1}
                                    borderRadius={50}
                                    
                                    borderColor={"#0e4db3"}
                                    variant="outlined"
                                    textProps={{color: "#0e4db3" , fontSize: 13}}
                                    onPress={() => onViewType(viewType as  "3D" | "AR")}
                       >
                                <MCIcon name="arrow-u-left-bottom" size={20} color="#0e4db3"/>
                                {
                                  viewType==="3D" ?
                                  "VIEW IN 3D" 
                                   :"VIEW IN AR"

                                }</Button>
                            ))}
                       </>
                   )}
             </XStack>
             <XStack alignItems={"center"} gap={10}>
                     {product.previousPrice > product.currentPrice && (
                        <Text fontSize={30} color={"red"}>-
                         {offPercentage(
                            product.currentPrice,
                            product.previousPrice
                         )}%</Text>
                     
                     )}
                     <Text fontSize={30}>{product.currentPrice}
                            <Text fontSize={20}>
                                  Birr
                            </Text>  
                     </Text>
             </XStack>
             <Text mb={20}
                   color={"gray"}
                   fontSize={17}
                   textDecorationLine="line-through"
               >
                   {product.previousPrice} Birr
             </Text>
             <Text>
                The prices of products sold on SimuShop include VAT. Depending on your
                delivery address, VAT may vary at checkout.
             </Text>
             <XStack my={20}>
              
                <Text fontWeight={"bold"}>
                    {product.deliveryPrice === 0 ? "FREE " :
                    ` ${product.deliveryPrice} Birr` } 
                    {" Delivery "}
                </Text>
               <Text fontWeight={"bold"}>
                  {deliveryDate(product.deliveryInDays)}
               </Text>
             </XStack>
             <YStack gap={20} mb={30}>
                 {product.amountInstock > 20? (
                    <Text fontSize={20} color={"green"}>
                          In Stock
                    </Text>
                 ) : (
                     <Text fontSize={20} color={"red"}>
                          {product.amountInstock} In Stock
                     </Text>
                 )}
                 <Button
                     onPress={() => setSelectOpen(prev => !prev)}
                  >
                        <Text mr={"auto"}>Quantity: {quantity}</Text>
                        <MCIcon name="chevron-down" size={20}/>
                 </Button>
                 <DefaultButton onPress={() => addItem(product , quantity)}>
                       Add to basket
                 </DefaultButton>
                 <DefaultButton bg={"orange"} onPress={() => {

                 }}>
                       Buy Now
                 </DefaultButton>
             </YStack>
        </ScrollView>
        <Dialog open={selectOpen}>
              <Dialog.Portal key={"select-quantity"}>
                 <Dialog.Overlay
                    onPress={() => setSelectOpen(false)}
                 />
                <Dialog.Content gap={10} width="60%">
                       <FlatList 
                           data={[1, 2, 3, 4 , 5]}
                           keyExtractor={(_ , index) => index.toString()}
                           ItemSeparatorComponent={
                            () => <View height={10} />}
                            renderItem={({item: num}) => (
                                <Button
                                        onPress={() => onSelectQuantity(num)}
                                 >{num.toString()}</Button>
                            )}
                           
                        />
                </Dialog.Content>
                
              </Dialog.Portal>
        </Dialog>
            </>
    );
}