import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import User from "@/lib/models/Users";
import mongoose from "mongoose";

type Params = {
  params: { id: string };
};

/**
 * GET user by Firebase UID
 * /api/users/:firebaseUid
 */export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const user = await User.findOne({
      firebaseUid: params.id,
    }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


/**
 * PATCH user by Mongo ObjectId
 * /api/users/:id
 */
export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid user id" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const user = await User.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("PATCH /api/users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE user by Mongo ObjectId
 * /api/users/:id
 */
export async function DELETE(
  _: Request,
  { params }: Params
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid user id" },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("DELETE /api/users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
