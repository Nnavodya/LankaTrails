import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="attractions" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
