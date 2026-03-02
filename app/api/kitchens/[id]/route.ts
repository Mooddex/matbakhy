import { NextRequest, NextResponse } from "next/server";
import  connectDB  from "@/lib/db/db";
import Kitchen from "@/lib/models/Kitchen";

// GET SINGLE KITCHEN
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const kitchen = await Kitchen.findById(params.id);

    if (!kitchen) {
      return NextResponse.json({ message: "Kitchen not found" }, { status: 404 });
    }

    return NextResponse.json(kitchen, { status: 200 });
  } catch (error) {
    console.error("GET kitchen error:", error);
    return NextResponse.json({ message: "Failed to load kitchen" }, { status: 500 });
  }
}

// UPDATE A KITCHEN
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const body = await req.json();
    const { userId, ...updateData } = body;

    const kitchen = await Kitchen.findById(params.id);

    if (!kitchen) {
      return NextResponse.json({ message: "Kitchen not found" }, { status: 404 });
    }

    // Only the creator can update
    if (kitchen.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updated = await Kitchen.findByIdAndUpdate(params.id, updateData, { new: true });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT kitchen error:", error);
    return NextResponse.json({ message: "Failed to update kitchen" }, { status: 500 });
  }
}

// DELETE A KITCHEN
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { userId } = await req.json();

    const kitchen = await Kitchen.findById(params.id);

    if (!kitchen) {
      return NextResponse.json({ message: "Kitchen not found" }, { status: 404 });
    }

    // Only the creator can delete
    if (kitchen.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await Kitchen.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Kitchen deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE kitchen error:", error);
    return NextResponse.json({ message: "Failed to delete kitchen" }, { status: 500 });
  }
}