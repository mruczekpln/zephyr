"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props extends React.ComponentProps<"a"> {
  type?: "logout";
}

export default function AuthLink(props: Props) {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) return <div></div>;
  else if (props.type === "logout")
    return (
      <div className="h" onClick={() => signOut({ callbackUrl: "/" })}>
        {props.children}
      </div>
    );
  else
    return (
      <Link prefetch={false} href={props.href as string}>
        {props.children}
      </Link>
    );
}
