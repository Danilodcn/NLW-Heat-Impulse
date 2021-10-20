import { useContext } from "react";
import { AiFillGithub } from "react-icons/ai";
import { AuthContext } from "../../contexts/auth";

import styles from "./styles.module.scss";

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext);

  return (
    <div className={styles.LoginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem </strong>

      <a href={signInUrl} className={styles.signInWithGithub}>
        <AiFillGithub size={26} />
        Entrar com Githut
      </a>
    </div>
  );
}
