import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthResponse = {
  token: string;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

const TOKEN_STORAGE = "@dowhile:token";

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=ca7898374c64a3644a1f`; //&redirect_uri=https://localhost:3000`

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;
    localStorage.setItem(TOKEN_STORAGE, token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE);

    if (token) {
      // const header = { Authorization: `Bearer ${token}` };

      // api.get<User>("profile", { headers: header }).then((response) => {
      //   setUser(response.data);
      // });

      //   O Diego fez dessa maneira

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      api.get<User>("profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");
      console.log([urlWithoutCode, githubCode]);

      window.history.pushState({}, "", urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl: signInUrl, user: user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
