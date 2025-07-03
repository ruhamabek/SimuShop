import { HeaderTabsProps } from "@/components/shared/header/HeaderTabs";
import { router, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button, ScrollView, Text, XStack, YStack } from "tamagui";
import {DeliveryLocation} from "../../components/shared/DeliveryLocation"
import { HomeCarousel } from "@/components/screens/home/HomeCarousel";
import { HomeSuggestions } from "@/components/screens/home/HomeSuggestions";
import { DefaultButton } from "@/components/shared/DefaultButton";
import { useAuth } from "@/context/AuthProvider";
import firestore, { collection, FirestoreError, onSnapshot } from '@react-native-firebase/firestore';
import { Product } from "@/types/product";
import { ProductDealCard } from "@/components/screens/home/ProductDealCard";



export default function Home() {
   const navigation = useNavigation();
   const { user } = useAuth();
   const [deals, setDeals] = useState<Product[]>([]);
   const [loading, setLoading] = useState(true);
   
   const onClickAuth = () => router.push("/login");

   const tabs: HeaderTabsProps["tabs"] =[
    { active: true,
        title: "Lists",
        onPress: () => Alert.alert("Lists")
    },
    { 
        title: "Prime",
        onPress: () => Alert.alert("Prime")
    },
    { 
        title: "Video",
        onPress: () => Alert.alert("Video")
    },
   ]

 const onProductPress = ({id}: Product) => {
            router.push(`/(search)/product/${id}`)
 }

  const getDeals = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await firestore()
        .collection('1') // Changed from '1' to meaningful name
        .get();

      const dealsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setDeals(dealsData );
      console.log(dealsData)
    } catch (error) {
      console.error("Error fetching deals: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: true,
    });

    getDeals();
  }, [navigation, getDeals]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  
    return (<ScrollView flex={1}>
        <DeliveryLocation />
        <HomeCarousel/>
        <HomeSuggestions/>
        <YStack bg={"white"} width="100%" p={20} gap={20}>
             <Text  als={"flex-start"} fontSize={20} fontWeight={"bold"}>
                {user ? "Deals for you" : "Sign in for best experience"}
             </Text>
             {user ? (
                <>
                  <XStack gap={30} justifyContent={"space-between"} 
                   flexWrap={"wrap"}
                  >
                    {deals.map((product) => 
                        <ProductDealCard
                            key={product.id}
                            product={product}
                            onPress={() => onProductPress(product)}
                        />
                      )}
                  </XStack>
                </>
             ): (
                <DefaultButton onPress={onClickAuth}>
                     Sign in Securely
                </DefaultButton>
             )}
        </YStack>
        
    </ScrollView>)
}