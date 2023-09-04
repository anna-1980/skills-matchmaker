"use client";
import React from "react";
import Button from "../components/button/Button";
import IconsLibrary from "../components/icons/IconsLibrary";
import { signOut } from "next-auth/react";

interface LogOutButtonProps {
  className: string;
}

const LogOutButton = ({ className }: LogOutButtonProps) => {
  return (
    <Button
      className={className}
      onClick={() => signOut()}
      priority="tertiary"
      expanded
      size="medium"
      iconL={<IconsLibrary symbol="exit" size="24px" fill="$color-secondary" />}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
