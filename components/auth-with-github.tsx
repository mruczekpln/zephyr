"use client";
import { signIn } from "next-auth/react";

import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { OAuthProvider } from "next-auth/providers/oauth";
import { Provider } from "next-auth/providers/index";

type Props = { githubProvider: { id: any } };
export default function AuthWithGithub({ githubProvider }) {
  return (
    <Button variant={"ghost"} onClick={() => signIn(githubProvider.id)}>
      <Github className="inline mr-2"></Github>
      Continue with GitHub
    </Button>
  );
}
