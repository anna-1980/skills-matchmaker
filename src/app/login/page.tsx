import { Inter } from "@next/font/google";
import styles from "./page.module.scss";
import LoginFrom from "../components/login-form/LoginForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles["login-page"]}>
      <div className={styles["login-page__branding"]}>
        <img
          className={styles["login-page__logo"]}
          src="../logo.svg"
          alt="logo"
        />
        <h1 className={styles["login-page__welcome-text"]}>
          <span className={styles["login-page__first-welcome-text"]}>
            Welcome to
          </span>
          <span className={styles["login-page__second-welcome-text"]}>
            Skills
          </span>
          <span className={styles["login-page__third-welcome-text"]}>
            Matchmaker
          </span>
        </h1>
      </div>

      <div className={styles["login-page__form"]}>
        <div className={styles["login-page__form-field"]}>
          <LoginFrom />
        </div>
        <p className={styles["login-page__bottom-text"]}>
          Proudly presented by
          <br />
          <strong>Training Frontend Development Team</strong>
        </p>
      </div>
    </main>
  );
}
