import { useContext } from "react";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { AuthContext } from "./contexts/auth";

import styles from "./App.module.scss";
import "./styles/globals.css";

export function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className={`${styles.contentWrapper}  ${!!user ? styles.contentSign : ""}`}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </div>
  );
}
