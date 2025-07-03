import { Text, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientBackground from "./GradientBackground";
import { HeaderSearch } from "./HeaderSearch";
import { NativeStackHeaderProps, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BottomTabHeaderProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { HeaderTabs, HeaderTabsProps } from "./HeaderTabs";

export interface CustomHeaderProps {
         headerSearchShown?: boolean;
         headerTabsProps?: HeaderTabsProps;
}

export interface StackHeaderProps extends NativeStackHeaderProps{
       options: NativeStackNavigationOptions & CustomHeaderProps;
}
export interface TabsHeaderProps extends BottomTabHeaderProps
{   
    options: BottomTabNavigationOptions & CustomHeaderProps;
}


export default function Header({options}: StackHeaderProps | TabsHeaderProps) {
    const edgeInsets = useSafeAreaInsets();

    if(options.headerLeft || options.headerTitle || options.headerRight ) {
           return (
            <YStack bg="$colorTransparent" >
                <XStack justifyContent={"space-between"} gap={20} py ={10}  px={20} mt={edgeInsets.top}> 
                    {options.headerSearchShown && <HeaderSearch/>}
                <YStack flex={1}>
                    {options.headerLeft && <options.headerLeft/>}
                </YStack>
                <YStack flex={1}>
                    {/* @ts-ignore*/}
                    {options.headerTitle && <options.headerTitle/>}
                </YStack>
                <YStack flex={1}>
                    {/* @ts-ignore*/}
                    {options.headerRight && <options.headerRight/>}
                </YStack>
                </XStack>
                <GradientBackground/>
            </YStack>
           )
    }

    return (<YStack  bg="$colorTransparent" >
        <YStack bg="$colorTransparent" gap={20} pb ={10} mt={edgeInsets.top} > 
            {options.headerSearchShown && <HeaderSearch/>}
            {options.headerTabsProps && <HeaderTabs {...options.headerTabsProps}/>}
        </YStack>
        <GradientBackground/>
        </YStack>
        )
}