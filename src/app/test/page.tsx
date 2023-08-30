"use client";
import { use, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export interface SkillProps {
  skill_id: number;
  name: string;
  level: number;
  last_used: string;
  usedDaily: boolean;
  comment: string;
}

export default function Test() {
  const { data, status } = useSession();
  const { user = {} } = data || {};
  const [userData, setUserData] = useState<Object>({ data });

  const userMock = {
    name: "Test",
    email: "test@test.test",
    password: "test",
  };
  const { email, password } = userMock;

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <h2>signed in as : </h2>
      {data ? <h2>{data?.user?.name}</h2> : <h2>{userMock.name}</h2>}
      <button
        style={{ backgroundColor: "green", color: "white" }}
        onClick={(e) => {
          signIn();
        }}
      >
        Sign in
      </button>
      <hr />
      {status === "authenticated" && (
        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={(e) => signOut()}
        >
          Sign out
        </button>
      )}

      <hr />
    </div>
  );
}
