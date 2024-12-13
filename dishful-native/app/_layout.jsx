import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { apiRequest } from "../api/request";
import axios from "axios";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    PoppinsThin: require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
  });

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  checkAuth();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(pages)/home" options={{ headerShown: false }} />
      <Stack.Screen
        name="(pages)/generate-from-name"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(pages)/generate-from-ingredients"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(pages)/generate-random"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(pages)/searched-recipe/[keyword]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(pages)/profile"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(pages)/about"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(pages)/saved-recipes" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
