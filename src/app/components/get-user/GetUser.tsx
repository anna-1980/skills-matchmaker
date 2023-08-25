"use client";
import { useSession } from "next-auth/react";

const GetUser = () => {
  const { data } = useSession();
  const { user = {} } = data || {};
  return <div> {data ? `${user?.name}!` : "Loading..."}</div>;
};

export default GetUser;
