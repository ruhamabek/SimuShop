
import { Tabs } from "expo-router";
import { Text, XStack, YStack } from "tamagui";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Header from "@/components/shared/header/Header";
import { useCart } from "@/context/CartProvider";
interface Tab {
    name: string;
    icon: "home-outline" | "account-outline" | "cart-check"; 
}

export default function TabLayout() {
    const {items} = useCart();
    const tabs: Tab[]= [{
        name: "index",
        icon: "home-outline",
    },
   {
        name: "profile",
        icon: "account-outline",
    },
 {
        name: "cart",
        icon: "cart-check",
    },

];

return(
    <Tabs>
        {tabs.map((tab) => (
            <Tabs.Screen
                key={tab.name}
                name={tab.name}
                options={{
                      tabBarStyle:{
                        borderTopWidth:1,
                        borderTopColor: "lightgray"
                      },
                      header: (props) => <Header {...props}/>,
                      tabBarLabel:() => null,
                      tabBarIcon:({focused}) => (
                        <YStack flex={1} mt={-5} gap={10} justify={"space-between"} alignItems= {"center"}>
                            <XStack width={50} height={4} borderRadius={20} background={focused? "#238db0": "$colorTransparent"}/>

                            <MCIcons
                                
                                name={tab.icon}
                                size={30}
                                color={focused? "#238db0": "$black"}
                                />
                            {tab.name === "cart" && (
                                <Text px={4} br={10} position="absolute"
                                 top={11} bg={"white"} fontWeight={"bold"}
                                 fontSize={12}
                                 color={focused? "#238db0": "black"}
                                >{items.reduce((total, item) => total + item.quantity, 0)}
                                </Text>
                            )}
                        </YStack>
                      )
                }}
            />
        ))}
    </Tabs>
)
}