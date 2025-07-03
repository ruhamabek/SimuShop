import { Input, XStack } from "tamagui";
import Icon from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { router, useSegments } from "expo-router";
import { Pressable } from "react-native";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback"; // adjust path if needed

export function HeaderSearch() {
  const segments = useSegments();
  const [query, setQuery] = useState("");
  const ref = useRef<Input>(null);

  const onPressIn = () => {
    if (segments[0] !== "(search)") {
      router.push("/(search)");
    }
  };

  const onGoBack = () => {
    setQuery("");
    router.dismissAll();
  };

  // ✅ Debounced router param update
  useDebouncedCallback(() => {
    if (query) {
      router.setParams({ query });
    }
  }, [query], 500); // 500ms debounce

  useEffect(() => {
    if (segments.length === 1 && segments[0] === "(search)") {
      ref.current?.focus();
    }
  }, [segments]);

  return (
    <XStack px={20} justifyContent={"center"} alignItems={"center"} gap={10}>
      {segments[0] === "(search)" && (
        <Pressable onPress={onGoBack}>
          <Icon name="arrow-back" color={"black"} size={24} />
        </Pressable>
      )}

      <XStack
        bg={"white"}
        flex={9}
        justifyContent={"center"}
        alignItems={"center"}
        borderWidth={1}
        borderColor={"#a456a6"}
        borderRadius={8}
        shadowColor={"gray"}
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.4}
        shadowRadius={4}
      >
        <Icon name="search" color={"black"} size={24} />
        <Input
          ref={ref}
          value={query}
          onPressIn={onPressIn}
          onChangeText={(text) => setQuery(text)}
          width={"75%"}
          bg={"white"}
          fontWeight={800}
          fontSize={20}
          borderWidth={0}
          placeholder="Search..."
        />
        <Icon name="scan" color={"black"} size={24} />
      </XStack>
    </XStack>
  );
}
