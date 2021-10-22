import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm";
import { SignIn } from "../../components/SignIn";
import { useAuth } from "../../hooks/auth";

export function Home() {
  const {user, isSignIn} = useAuth();
  return (
    <View style={styles.container}>
      <Header />
      <MessageList />
      {user ? <SendMessageForm/> : <SignIn />}
      {/* <SignIn /> */}
      {/* <SendMessageForm /> */}
    </View>
  );
}
