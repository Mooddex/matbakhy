import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import User from "@/lib/models/Users";

type Params = {
  params: { id: string };
};
export async function GET(_: Request, { params }: Params) {
  await connectDB();

  const { id } = params;

  const user = await User.findById(id).select("-password");

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PATCH(req: Request, { params }: Params) {
  await connectDB();

  const { id } = params;
  const body = await req.json();

  const user = await User.findByIdAndUpdate(id, body, { new: true }).select(
    "-password"
  );

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: Params) {
  await connectDB();

  const { id } = params;
  const user = await User.findByIdAndDelete(id);

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ message: "User deleted" });
}
