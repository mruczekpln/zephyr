import { Bird, UserCircle2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import AccountDropdown from "./account-dropdown";
import AuthClickabe from "./auth-clickable";
import { Avatar } from "./ui/avatar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navigation() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div
      className={`flex items-center h-auto top-16 w-full max-w-screen overflow-x-hidden px-20 mx-auto z-10 absolute`}
    >
      <Link
        href={"/"}
        className="text-xl flex gap-2 items-center hover:bg-primary/20 px-4 rounded-xl transition-colors duration-200"
      >
        <Bird color="black" size={32} />
        <p className="">zephyr </p>
      </Link>
      <ul></ul>
      <div className="grow-[2] flex justify-end">
        <div className=" flex gap-4 items-center">
          {/* <ThemeSwitch></ThemeSwitch> */}
          {/* <div className='w-10 aspect-square bg-black rounded-full'></div> */}
          {!session ? (
            <>
              <AuthClickabe
                clickableType="button"
                authType="signin"
              ></AuthClickabe>
            </>
          ) : (
            <>
              <AccountDropdown
                userName={session!.user?.name as string}
              ></AccountDropdown>
              <Avatar className="items-center">
                {(
                  <Image
                    src={session.user?.image as string}
                    alt=""
                    fill
                  ></Image>
                ) || <UserCircle2 size={64}></UserCircle2>}
              </Avatar>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
