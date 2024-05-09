"use client";

import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { UserCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import AccountLoading from "./loading";
import { SessionData } from "@/types/index";

export default function Account() {
  const { data, status } = useSession({ required: true });
  const user = data?.user as SessionData;

  let content;
  if (status === "loading") content = <AccountLoading></AccountLoading>;
  else if (status === "authenticated")
    content = (
      <>
        <Avatar className="w-32 h-32 outline outline-offset-8 outline-black/50 flex items-center justify-center">
          {user.image ? (
            <Image src={user.image || "o"} alt="" fill></Image>
          ) : (
            <UserCircle2 size="full"></UserCircle2>
          )}
        </Avatar>
        <h1 className="text-6xl font-title w-max">
          Hello, <u>{user?.name}</u>!
        </h1>
        <Card>
          <CardContent className="flex gap-8 items-center p-6">
            <div className="flex flex-col items-center">
              <h1 className="text-5xl font-extrabold">
                {user.searches.length}
              </h1>
              <p>Total Searches</p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-extrabold">
                {user.favLocation.name.length > 30
                  ? user.favLocation.name.split(",")[0]
                  : user.favLocation.name || "You don't have"}
              </h1>
              <p>Favorite Location</p>
            </div>
          </CardContent>
        </Card>
      </>
    );

  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-16 h-full w-full">
        {content}
      </div>
    </div>
  );
}
