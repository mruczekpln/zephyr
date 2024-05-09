import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import UsersCollection from "../users-collection";

export async function POST(request: Request) {
  const credentials = await request.json();

  const users = await UsersCollection();
  const user = await users.findOne({
    $or: [{ name: credentials.name }, { email: credentials.email }],
  });

  let response;
  if (user)
    response = {
      redirect: false,
      message: "This username or email is already in use!",
    };
  else {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    response = await users.insertOne({
      name: credentials.name as string,
      email: credentials.email as string,
      password: hashedPassword as string,
      image: "",
      favLocation: {
        name: "",
        count: 0,
      },
      searches: [],
      settings: {
        unit: "metric",
      },
      createdAt: new Date().toString(),
      emailVerified: false,
    });
  }

  return NextResponse.json(response);
}
