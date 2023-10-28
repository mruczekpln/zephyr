import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import gradient from "@/public/gradient.jpeg";
import AuthWithGithub from "@/components/auth-with-github";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const providers = await getProviders();
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="bg-secondary border-r relative bg-">
        <div
          className="absolute inset-0 rotate-180"
          style={{ backgroundImage: `url(${gradient.src})` }}
        ></div>
        <div className="absolute bottom-20 left-20 w-2/3">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Zephyr has made staying on top of the weather a breeze.
              It's my go-to app for accurate forecasts and real-time updates.
              Love the sleek design and user-friendly interface.&rdquo; <br />
              <u>(ChatGPT cap.)</u>
            </p>
            <footer className="text-sm">cytryneq95</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <form>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-4">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-4xl font-semibold tracking-tight font-title">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Fill the fields to create your account.
                </p>
              </div>
              <AuthWithGithub
                githubProvider={providers?.github}
              ></AuthWithGithub>
              <Separator></Separator>
              <Input placeholder="Username" type="text" required></Input>
              <Separator></Separator>
              <Input placeholder="E-mail adress" type="email" required></Input>
              <Input
                placeholder="Repeat e-mail adress"
                type="email"
                required
              ></Input>
              <Separator></Separator>
              <Input placeholder="Password" type="password" required></Input>
              <Separator></Separator>
              <Button disabled={false}>
                {/* {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )} */}
                Create account!
              </Button>
              <p className="px-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
