import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm";
import { SignIn } from "../../components/SignIn";
import { useAuth } from "../../hooks/auth";

export function Home() {
  const { user, isSignIn } = useAuth();
  return (
    <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === "ios" ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Header />
        <MessageList />
        {user ? <SendMessageForm /> : <SignIn />}
        {/* <SignIn /> */}
        {/* <SendMessageForm /> */}
      </View>
    </KeyboardAvoidingView>
  );
}
