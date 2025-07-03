import { XStack } from '@tamagui/stacks';
import Icon from "@expo/vector-icons/Ionicons"
import { Text } from 'tamagui';
export function DeliveryLocation(){
    return (
        <XStack bg={"#c7e8f0"} width={'100%'} gap={5}
          justifyContent={"flex-start"} alignItems={"center"} padding={15}
        >
          <Icon name='location-outline' color={"black"} size={24}/>
            <Text ml={10} fontSize={16} ta={"center"} color={"black"} fontWeight={"normal"}>
              Deliver to -
            </Text>
            <Text fontSize={16} ta={"center"} color={"black"} fontWeight={"normal"}>
              Select Location
            </Text>
            <Icon name='chevron-down' color={"black"} size={18}/>
        </XStack>
    )
};