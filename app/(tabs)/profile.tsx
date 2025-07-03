import Icons from "@expo/vector-icons/Ionicons"
import { Avatar, Button, Image, ScrollView, Sheet, Text, XStack, YStack } from "tamagui";
import React, { useEffect, useState } from "react";
import { DefaultButton } from "@/components/shared/DefaultButton";
import { router, useNavigation } from "expo-router";
import { ProfileUnauthedBanner } from "@/components/screens/profile/ProfileUnauthedBanner";
import SimuShopLogo from "@/assets/LOGO.png"
import { useAuth } from "@/context/AuthProvider";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { Pressable } from "react-native";


export default function Profile(){
    const { user, isLoading, getToken } = useAuth();
     const [sheetOpen , setSheetOpen] = useState(false);
     
    const onClickAuth = () => router.push("/login");
    const navigation = useNavigation();
      const logOut = async () => {
        try {
            await signOut(getAuth());
            setSheetOpen(false);
            // Don't navigate here - AuthProvider will handle it
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

        useEffect(() => {
         navigation.setOptions({
            headerSearchShown: Boolean(user),
            headerLeft: !user ? 
               () => <Image source={{uri: SimuShopLogo}} width={100} height={30}/> : null
                  
         })
    }, [ navigation.setOptions , user])

    return (
        <>
            <ScrollView bg={"white"}>
             {user ? (
                <>
                     <XStack justifyContent="space-between" p={20} gap={20}>
                            <Pressable onPress={() => setSheetOpen(prev => !prev)}>
                                   <XStack justifyContent="flex-start" alignItems={"center"} gap={10}>
                                        <Avatar circular size={30}>
                                              <Avatar.Fallback bg={"gray"}/>
                                        </Avatar>
                                        <Text fontWeight={"bold"} fontSize={18}>
                                                Hello, {user.email}
                                        </Text>
                                        <Icons 
                                             name="chevron-down"
                                             size={20}
                                         />
                                   </XStack>
                            </Pressable>      
                     </XStack>
                </>
             ) : (
                  <YStack flex={1} pt={40} alignItems={"center"} gap={45}>
                      <YStack  gap={40} width="100%" justifyContent ={"center"} alignItems={"center"}>
                          <Text 
                                textAlign={"center"} fontSize={24} 
                          >Sign in for the optimal experience</Text>
                          <YStack width={"90%"} gap={15}>
                                <DefaultButton onPress={onClickAuth}>
                                      Sign In
                                </DefaultButton>
                                <DefaultButton onPress={onClickAuth} variant="secondary">
                                     Create Account
                                </DefaultButton>
                          </YStack>
                      </YStack>
                      <ProfileUnauthedBanner/>
                  </YStack>
             )}
        </ScrollView>
           <Sheet 
               open={sheetOpen}
               onOpenChange={(open:boolean) => setSheetOpen(open)}
            >
                <Sheet.Overlay/>
                <Sheet.Handle/>
                <Sheet.Frame p={20} gap={20}>
                    <Text>{user?.email}</Text>
                    <Button textProps={{fontSize: 18 }} bg={"red"} onPress={logOut}>
                         Logout
                    </Button>
                </Sheet.Frame>
           </Sheet>
        </>
    )
}