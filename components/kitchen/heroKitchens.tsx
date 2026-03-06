// components/kitchen/heroKitchens.tsx
import KitchenCard from "./KitchenCard";
import { Kitchen } from "@/lib/types/Kitchens";

const API_URL = process.env.PlaceHolderURL;

export default async function HeroKitchens() {
  // Fetch data directly inside the component
  const fetchHeroKitchens = async () => {
    try {
      const res = await fetch(`${API_URL}`);
      if (!res.ok) throw new Error("Failed to load kitchens");
      return await res.json();
    } catch (error) {
      console.error(error);
      return []; // Return empty array on error to prevent layout shift
    }
  };

  const data = await fetchHeroKitchens();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-4">
      {data.length > 0 ? (
        data.map((kitchen: Kitchen) => (
          <KitchenCard key={kitchen._id} {...kitchen} />
        ))
      ) : (
        <p className="col-span-full text-gray-500 text-center">Loading kitchens...</p>
      )}
    </div>
  );
}
