import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSections from "expo-auth-session";
import api from "../services/api";

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  isSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthResponse = {
  token: string;
  user: User;
};
type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const CLIENT_ID = "ca7898374c64a3644a1f";
  const SCOPE = "read:user";
  const USER_STORAGE = "@nlwheat:user";
  const TOKEN_STORAGE = "@nlwheat:token";

  async function signIn() {
    try {
      setIsSignIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = (await AuthSections.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      // console.log(authSessionResponse);
      if (
        authSessionResponse.type == "success" &&
        authSessionResponse.params.error != "access_denied"
      ) {
        const authResponse = await api.post("/authenticate", {
          code: authSessionResponse.params.code,
        });
        const { token, user } = authResponse.data as AuthResponse;
        // console.log("token", { token, user });

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // console.log(token);
        await AsyncStorage.setItem(TOKEN_STORAGE, token);
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        // console.log("token: ", token);

        setUser(user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSignIn(false);
    }
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);
      // console.log("storage: ", tokenStorage);
      if (userStorage && tokenStorage) {
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }

      setIsSignIn(false);
    }

    loadUserStorageData();
  }, []);

  async function signOut() {
    // console.log("saindo ...")
    setIsSignIn(false);
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };
