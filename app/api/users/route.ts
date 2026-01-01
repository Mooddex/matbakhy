import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import User from "@/lib/db/models/Users";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const user = await User.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 400 }
    );
  }
}

export async function GET() {
  await connectDB();
  const users = await User.find().select("-password");
  return NextResponse.json(users);
}
