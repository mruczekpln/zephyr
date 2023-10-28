import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import gradient from "@/public/gradient.jpeg";
import AuthWithGithub from "@/components/auth-with-github";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function LogIn() {
  const providers = await getProviders();
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="flex items-center justify-center">
        <form>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-4">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-4xl font-semibold tracking-tight font-title">
                  Log yourself in
                </h1>
                <p className="text-sm text-muted-foreground">
                  We need your email & password to log you in.
                </p>
              </div>
              <Input placeholder="E-mail adress" type="email" required></Input>
              <Separator></Separator>
              <Input placeholder="Password" type="password" required></Input>
              <Separator></Separator>
              <Button disabled={false}>
                {/* {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )} */}
                Log in!
              </Button>
              <Separator></Separator>
              <AuthWithGithub
                githubProvider={providers?.github}
              ></AuthWithGithub>
              <p className="px-8 text-center text-sm text-muted-foreground">
                Haven't created an account yet?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </form>
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
