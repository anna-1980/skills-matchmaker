"use client";
import styles from "./LoginForm.module.scss";
import Button from "../button/Button";
import IconsLibrary from "../icons/IconsLibrary";
import Input from "../input/Input";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormEventHandler, useState } from "react";

function LoginFrom() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: true,
      callbackUrl: "/",
    });

    console.log(res);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <div className={styles["login__input-field"]}>
        <Input
          placeholder="Username"
          name="username"
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, email: target.value });
            console.log(userInfo);
          }}
        >
          <IconsLibrary
            symbol="email"
            size="16px"
            fill="var(--color-primary)"
          />
        </Input>
      </div>

      <div className={styles["login__input-field"]}>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, password: target.value });
          }}
        >
          <IconsLibrary
            symbol="password"
            size="16px"
            fill="var(--color-primary)"
          />
        </Input>
      </div>

      <Button type="submit" priority="accent" expanded size="medium">
        Login
      </Button>
    </form>
  );
}

export default LoginFrom;
