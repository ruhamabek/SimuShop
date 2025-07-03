import { Button } from "tamagui"
import Icon from"@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Props{
    onPress: VoidFunction
}

export default function FloatingBackButton({onPress}: Props) {
    const edgeInsets = useSafeAreaInsets();


    return <Button onPress={onPress}   
              zIndex={1}
               pos="absolute"
               bg="gray"
               t={10}
               l={10}
               borderRadius={50}
               width={60}
               height={60}
               mt={edgeInsets.top}>
          <Icon name="chevron-back" size={22} />
    </Button>
}
