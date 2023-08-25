"use client";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";

const ProtectRoutes = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const path = usePathname();
  let session =
    useSession({
      required: true,
      onUnauthenticated() {
        router.push("/login");
      },
    }) ;
  return <>{children}</>;
};

export default ProtectRoutes;
