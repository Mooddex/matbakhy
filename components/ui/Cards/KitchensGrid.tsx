
import { fetchKitchens } from "@/app/actions/kitchen";
import KitchenCard from "./KitchenCard";
import { Kitchen } from "@/types/Kitchens";

export default async function KitchensGrid({ }) {
  
const data = await fetchKitchens();
 
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((kitchen: Kitchen) => (
        <KitchenCard key={kitchen.id} {...kitchen} />
      ))}
    </div>
  );
}


