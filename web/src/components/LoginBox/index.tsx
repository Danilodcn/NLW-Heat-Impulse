import { AiFillGithub } from "react-icons/ai";

import styles from "./styles.module.scss";

export function LoginBox() {
  return (
    <div className={styles.LoginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem </strong>

      <a href="#" className={styles.signInWithGithub}>
        <AiFillGithub size={26} />
        Entrar com Githut
      </a>
    </div>
  );
}
