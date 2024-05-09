import { NextResponse } from "next/server";
import { UserSettings } from "@/types/index";
import { ObjectId } from "mongodb";
import UsersCollection from "../users-collection";

type RequestBody = { id: string } & UserSettings;
export async function POST(req: Request) {
  const { id, unit }: RequestBody = await req.json();

  const users = await UsersCollection();
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        settings: { unit },
      },
    }
  );
  console.log(result);

  return NextResponse.json({ updated: true });
}
