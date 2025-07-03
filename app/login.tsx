import { DefaultButton } from "@/components/shared/DefaultButton";
import Icon from "@expo/vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import { Checkbox, Form, Input, Label, Text, XStack, YStack } from "tamagui";

enum Step {
  EMAIL = 1,
  PASSWORD = 2,
}

export default function Login() {
  const navigation = useNavigation();

  const [step, setStep] = useState(Step.EMAIL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onGoBack = () => router.push("/profile");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={onGoBack}>
          <Text fontSize={18} fontWeight={800}>
            Back
          </Text>
        </Pressable>
      ),
      headerTitle: () => (
        <Text fontSize={18} fontWeight="bold">
          SimuShop
        </Text>
      ),
    });
  }, [navigation]);

  const handleAuth = async () => {
    try {
      // Try to create a new account
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("Account created successfully");
      router.push("/(tabs)/profile");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        try {
          // If already exists, sign in
          await auth().signInWithEmailAndPassword(email, password);
          console.log("Signed in existing user");
          router.push("/(tabs)/profile");
        } catch (signInError: any) {
          console.error("Sign in failed", signInError);
        }
      } else if (error.code === "auth/invalid-email") {
        console.error("Invalid email address!");
      } else {
        console.error("Authentication error", error);
      }
    }
  };

  return (
    <YStack flex={1} alignItems="center" p={20} gap={20} bg="white">
      <Text als="flex-start" fontSize={20} fontWeight="bold">
        Sign in {step === Step.EMAIL && "or create an account"}
      </Text>

      <Form width="100%" gap={20}>
        {step === Step.EMAIL ? (
          <Label als="flex-start" fontSize={16} fontWeight="bold">
            Enter Email
          </Label>
        ) : (
          <XStack gap={10} alignItems="center">
            <Text fontWeight="bold" fontSize={16}>
              {email}
            </Text>
            <Pressable onPress={() => setStep(Step.EMAIL)}>
              <Text
                fontSize={16}
                textDecorationLine="underline"
                color="#146eb4"
              >
                Change
              </Text>
            </Pressable>
          </XStack>
        )}

        {step === Step.EMAIL ? (
          <Input
            value={email}
            onChangeText={setEmail}
            borderRadius={4}
            borderColor="lightgray"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
          />
        ) : (
          <>
            <Input
              value={password}
              onChangeText={setPassword}
              borderRadius={4}
              borderColor="lightgray"
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <XStack alignItems="center" gap={10}>
              <Checkbox
                checked={showPassword}
                borderColor="lightgray"
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setShowPassword(checked);
                  }
                }}
              >
                {showPassword && (
                  <Checkbox.Indicator>
                    <Icon name="checkmark" color="lightblue" />
                  </Checkbox.Indicator>
                )}
              </Checkbox>
              <Text>Show Password</Text>
            </XStack>
          </>
        )}
      </Form>

      <DefaultButton
        width="100%"
        disabled={email.length < 5}
        disabledStyle={{ opacity: 0.5 }}
        onPress={() => {
          if (step === Step.EMAIL) {
            setStep(Step.PASSWORD);
          } else {
            handleAuth();
          }
        }}
      >
        {step === Step.EMAIL ? "Continue" : "Sign In"}
      </DefaultButton>

      <XStack width="100%" alignItems="center" justifyContent="center">
        <Text>By continuing, you agree to our </Text>
        <Text textDecorationLine="underline" color="#146eb4">
          Terms and Conditions
        </Text>
      </XStack>

      <XStack
        mt={10}
        height={3}
        bg="lightgray"
        width={Dimensions.get("window").width}
      />

      <YStack gap={20}>
        <XStack gap={20}>
          {["Conditions of use", "Privacy Notice", "Help"].map((link) => (
            <Text
              key={link}
              fontSize={16}
              textDecorationLine="underline"
              color="#146eb4"
            >
              {link}
            </Text>
          ))}
        </XStack>
        <Text color="gray" alignSelf="center">
          ©2025 SimuShop
        </Text>
      </YStack>
    </YStack>
  );
}
