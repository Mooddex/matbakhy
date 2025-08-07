// app/lib/getKitchens.ts
import dbConnect from "@/lib/dbConnect";
import Kitchen from "@/models/Kitchen";

export async function getKitchensFromDB() {
  await dbConnect();
  const kitchens = await Kitchen.find().lean();
  return JSON.parse(JSON.stringify(kitchens));
}
