import { NextRequest, NextResponse } from "next/server";
import { getKitchenById } from "@/app/api/kitchens/actions";
import Kitchen from "@/models/Kitchen";
import dbConnect from "@/lib/dbConnect";

// GET - Fetch single kitchen
export async function GET(
  _req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } // ✅ Fixed for Next.js 15+
) {
  const { id } = await params; // ✅ Await params
  
  const kitchen = await getKitchenById(id);
  if (!kitchen) {
    return NextResponse.json({ success: false, message: "Kitchen not found" }, { status: 404 });
  }
  
  return NextResponse.json({ success: true, data: kitchen });
}

// PUT - Update kitchen
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Fixed for Next.js 15+
) {
  try {
    await dbConnect();
    
    const { id } = await params; // ✅ Await params
    const updateData = await req.json();
    
    const updatedKitchen = await Kitchen.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedKitchen) {
      return NextResponse.json(
        { success: false, message: "Kitchen not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedKitchen });
  } catch (error) {
    console.error("❌ Update error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Remove kitchen
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Fixed for Next.js 15+
) {
  try {
    await dbConnect();

    const { id } = await params; // ✅ Await params
    console.log("🗑 Delete request for kitchen ID:", id);

    const deletedKitchen = await Kitchen.findByIdAndDelete(id);

    if (!deletedKitchen) {
      console.warn("⚠️ Kitchen not found:", id);
      return NextResponse.json(
        { success: false, message: "Kitchen not found" },
        { status: 404 }
      );
    }

    console.log("✅ Kitchen deleted:", deletedKitchen);
    return NextResponse.json(
      { success: true, data: deletedKitchen },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Delete error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}