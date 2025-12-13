import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize'


export default function RootLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <Host>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
      </Host>
    </GestureHandlerRootView>
  );
}
