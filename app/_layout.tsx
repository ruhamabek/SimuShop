


import { StatusBar } from 'expo-status-bar';

import 'react-native-reanimated';
import React from 'react';
import { TamaguiProvider } from 'tamagui'
import { tamaguiConfig } from '../tamagui.config'
import { Stack } from 'expo-router';
import Header from '@/components/shared/header/Header';
import { AuthProvider } from '@/context/AuthProvider';
import { CartProvider } from '@/context/CartProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {

  return (
    <GestureHandlerRootView>
            <AuthProvider>
      <CartProvider>
      <TamaguiProvider config={tamaguiConfig}>
       <StatusBar style="auto" />
         <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='(tabs)'/>
        <Stack.Screen name='(search)'/>
        <Stack.Screen name='login'
            options={{
              headerShown: true,
              header: (props) => <Header {...props}/>,
              presentation: "fullScreenModal"
            }}
        />
      </Stack>
    </TamaguiProvider>     
      </CartProvider>
    </AuthProvider>
    </GestureHandlerRootView>
    

  );
}
