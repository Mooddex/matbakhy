import KitchenCard from "./KitchenCard";
import { Kitchen } from "@/lib/types/Kitchens";
import { kitchensCollection, serializeKitchenDoc } from "@/lib/firebase/firestore";

export default async function HeroKitchens() {
  const fetchHeroKitchens = async () => {
    try {
      const kitchens = kitchensCollection();
      if (!kitchens) return [] as Kitchen[];

      const snapshot = await kitchens.orderBy("createdAt", "desc").limit(6).get();
      return snapshot.docs.map((doc) => serializeKitchenDoc(doc) as Kitchen);
    } catch (error) {
      console.error(error);
      return [] as Kitchen[];
    }
  };

  const data = await fetchHeroKitchens();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-4">
      {data.length > 0 ? (
        data.map((kitchen: Kitchen) => (
          <KitchenCard key={kitchen._id || kitchen.id} {...kitchen} />
        ))
      ) : (
        <p className="col-span-full text-gray-500 text-center">No kitchens available right now.</p>
      )}
    </div>
  );
}
