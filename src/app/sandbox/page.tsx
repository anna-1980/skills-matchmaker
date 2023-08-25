"use client";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";

interface Props {}

const SignIn = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
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
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="john@email.com"
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default SignIn;

// "use client";
// import styles from "./LoginForm.module.scss";
// import Button from "../button/Button";
// import IconsLibrary from "../icons/IconsLibrary";
// import Input from "../input/Input";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { use, useRef } from "react";
// import { getCsrfToken } from "next-auth/react";
// import type {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from "next";

// export default function LoginFrom({
//   csrfToken,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   const session = useSession();

//   // const onSubmit = async (e: any) => {
//   //   e.preventDefault();
//   //   signIn("matchmaker-provider", {
//   //     email: "test@test.test",
//   //     password: "test",
//   //     redirect: true,
//   //     callbackUrl: "/sandbox",
//   //   });
//   //   console.log("on submit -from LoginForm");
//   // };

//   console.log(session);

//   return (
//     <form
//       method="post"
//       className={styles.login}
//       action="/api/auth/callback/credentials"
//     >
//       <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
//       <div className={styles["login__input-field"]}>
//         <Input placeholder="Username" name="userName">
//           <IconsLibrary
//             symbol="email"
//             size="16px"
//             fill="var(--color-primary)"
//           />
//         </Input>
//       </div>

//       <div className={styles["login__input-field"]}>
//         <Input placeholder="Password" type="password" name="password">
//           <IconsLibrary
//             symbol="password"
//             size="16px"
//             fill="var(--color-primary)"
//           />
//         </Input>
//       </div>

//       <Button
//         type="submit"
//         priority="accent"
//         expanded
//         size="medium"
//         // onClick={() => {
//         //   onSubmit();
//         // }}
//       >
//         Login
//       </Button>
//     </form>
//   );
// }

// // export default LoginFrom;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
