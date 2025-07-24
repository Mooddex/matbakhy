import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Kitchen from "@/models/Kitchen";

// GET - fetch all kitchens
export async function GET() {
  try {
    await dbConnect();
    const kitchens = await Kitchen.find({});
    return NextResponse.json({ success: true,kitchens }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

// POST - create new kitchen
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
      console.log("📥 New kitchen request body:", body); // Add this

    const newKitchen = await Kitchen.create(body);
        console.log("✅ Saved to DB:", newKitchen);       // And this

    return NextResponse.json({ success: true, data: newKitchen }, { status: 201 });
  } catch (error) {
        console.error("❌ DB error:", error);

    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
