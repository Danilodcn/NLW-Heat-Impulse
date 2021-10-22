import React from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Home } from "./src/screens/Home";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/hooks/auth";

export default function App() {
  const [fontload] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontload) {
    console.log(fontload);
    return <AppLoading />;
  } else {
    return (
      <AuthProvider>
        <StatusBar style="light" />
        <Home />
      </AuthProvider>
    );
  }
}
