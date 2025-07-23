import dbConnect from "@/app/lib/dbConnect";
import Kitchen from "@/models/Kitchen";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  await dbConnect();
  const body = await req.json();
  const kitchen = await Kitchen.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(kitchen);
}

export async function DELETE(_: Request, { params }: Params) {
  await dbConnect();
  await Kitchen.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
