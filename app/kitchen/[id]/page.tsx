import { fetchKitchenById } from "@/app/actions/kitchen";
import { notFound } from "next/navigation";
import SingleKitchen from "@/components/Kitchen";
export default async function KitchenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let Kitchen;
  // get the kitchen details by its id
  try {
    Kitchen = await fetchKitchenById(id);
  } catch (error) {
    console.error("Failed to fetch kitchen:", error);
    notFound(); // This will show a 404 page
  }

  if (!Kitchen) {
    notFound();
  }

  return (
   <SingleKitchen Kitchen={Kitchen} />
  );
}
