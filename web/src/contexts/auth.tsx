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

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=93ff3dc9464f0bec9894`; //&redirect_uri=https://localhost:3000`

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;
    localStorage.setItem("@dowhile:token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      // const header = { Authorization: `Bearer ${token}` };

      // api.get<User>("profile", { headers: header }).then((response) => {
      //   setUser(response.data);
      // });

      //   O Diego fez dessa maneira

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      api.get("profile").then((response) => {
        console.log(response);
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
