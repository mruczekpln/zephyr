import gradient from "@/public/gradient.webp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInForm from "./signin-form";

export default async function SignIn() {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="bg-secondary border-r relative">
        <div
          className="absolute inset-0 rotate-180"
          style={{
            backgroundImage: `url(${gradient.src})`,
            backgroundSize: "150%",
          }}
        ></div>
        <div className="absolute bottom-20 left-20 w-1/3">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Zephyr has made staying on top of the weather a breeze.
              It&apos;s my go-to app for accurate forecasts and real-time
              updates. Love the sleek design and user-friendly interface.&rdquo;{" "}
              <br />
              <u>(ChatGPT cap.)</u>
            </p>
            <footer className="text-sm">cytryneq95</footer>
          </blockquote>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <SignInForm></SignInForm>
      </div>
    </div>
  );
}
