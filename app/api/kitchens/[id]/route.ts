import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Kitchen from "@/lib/models/Kitchen";

// GET SINGLE KITCHEN
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const kitchen = await Kitchen.findById(id);

    if (!kitchen) {
      return NextResponse.json(
        { message: "Kitchen not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(kitchen, { status: 200 });
  } catch (error) {
    console.error("GET kitchen error:", error);
    return NextResponse.json(
      { message: "Failed to load kitchen" },
      { status: 500 },
    );
  }
}

// UPDATE A KITCHEN
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const body = await req.json();
    const { userId, ...updateData } = body;

    const kitchen = await Kitchen.findById(id);

    if (!kitchen) {
      return NextResponse.json(
        { message: "Kitchen not found" },
        { status: 404 },
      );
    }

    if (kitchen.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updated = await Kitchen.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT kitchen error:", error);
    return NextResponse.json(
      { message: "Failed to update kitchen" },
      { status: 500 },
    );
  }
}

// DELETE A KITCHEN
import { adminAuth } from "@/lib/firebase/firebase-admin";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // 1. Verify token from header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    await connectDB();
    const { id } = await params;

    const kitchen = await Kitchen.findById(id);
    if (!kitchen) {
      return NextResponse.json({ message: "Kitchen not found" }, { status: 404 });
    }

    // 2. Compare verified uid
    if (kitchen.userId !== uid) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await Kitchen.findByIdAndDelete(id);
    return NextResponse.json({ message: "Kitchen deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("DELETE kitchen error:", error);
    return NextResponse.json({ message: "Failed to delete kitchen" }, { status: 500 });
  }
}