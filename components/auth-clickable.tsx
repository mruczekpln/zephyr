"use client";

import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";

const authTypes: {
  [key: string]: {
    text: string;
    fn: typeof signIn | typeof signOut;
  };
} = {
  signin: {
    text: "Sign In",
    fn: signIn as typeof signIn,
  },
  signout: {
    text: "Sign out",
    fn: signOut as typeof signOut,
  },
};

interface Props {
  clickableType: "a" | "button";
  authType: keyof typeof authTypes;
}

export default function AuthClickabe({ clickableType, authType }: Props) {
  if (clickableType === "a")
    return (
      <p onClick={() => (authTypes[authType].fn as typeof signIn)()}>
        {authTypes[authType].text}
      </p>
    );
  else
    return (
      <Button onClick={() => (authTypes[authType].fn as typeof signOut)()}>
        {authTypes[authType].text}
      </Button>
    );
}
