import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function RootLayout() {
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboarded();
  }, []);

  const checkOnboarded = async () => {
    const value = await AsyncStorage.getItem("onboarded");
    setOnboarded(value === "true");
  };

  if (onboarded === null) return <View />;

  return (
    <>
      <Stack>
        {!onboarded ? (
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        ) : null}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
