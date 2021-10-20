import styles from "./App.module.scss";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import "./styles/globals.css";

export function App() {
  return (
    <div className={styles.contentWrapper}>
      <MessageList />
      <LoginBox />
    </div>
  );
}
