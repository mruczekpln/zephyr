import Link from "next/link";
import gradient from "@/public/gradient.webp";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogInForm from "./login-form";
import AuthWithGithub from "../auth-with-github";

export default async function LogIn() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="mx-auto flex flex-col justify-center space-y-4 w-[350px]">
        <div className="flex flex-col space-y-2 text-center mb-2">
          <h1 className="text-4xl font-semibold tracking-tight font-title">
            Log yourself in
          </h1>
          <p className="text-sm text-muted-foreground">
            We need your email & password to log you in.
          </p>
        </div>
        <LogInForm></LogInForm>
        <AuthWithGithub className="w-full"></AuthWithGithub>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Haven&apos;t created an account yet?&nbsp;
          <Link
            href="/auth/signin"
            className="underline underline-offset-4 text-foreground hover:text-primary cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </div>

      <div
        className="bg-secondary border-l relative "
        style={{
          backgroundImage: `url(${gradient.src})`,
          backgroundSize: "150%",
        }}
      >
        <div className="absolute bottom-20 left-20 w-1/3">
          <blockquote className="space-y-2">
            <p className="text-lg text-zinc-100">
              &ldquo;Zephyr keeps me ahead of the weather. Simple, reliable, and
              essential.&rdquo; <br />
              <u>(ChatGPT cap.)</u>
            </p>
            <footer className="text-sm text-zinc-100">kajtekzjarus</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
