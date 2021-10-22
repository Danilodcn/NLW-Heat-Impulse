import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import LogoSvg from "../../assets/logo.svg";
import { UserPhoto } from "../UserPhoto";
import { useAuth } from "../../hooks/auth";

export const Header: React.FC = () => {
  const { user, isSignIn, signOut} = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.user}>
        <TouchableOpacity onPress={signOut}>
          {user ? <Text style={styles.logoutText}>Sair</Text> : <></>}
        </TouchableOpacity>
        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
};
