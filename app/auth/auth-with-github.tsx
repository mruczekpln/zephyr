"use client";

import { signIn } from "next-auth/react";

import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

export default function AuthWithGithub({
  className,
}: ComponentProps<"button">) {
  return (
    <Button
      variant={"ghost"}
      className={className}
      onClick={() => signIn("github", { redirect: false, callbackUrl: "/" })}
    >
      <Github className={"inline mr-2"}></Github>
      Continue with GitHub
    </Button>
  );
}
