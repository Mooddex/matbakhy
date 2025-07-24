import KitchenCard from "@/components/KitchenCard";
import Image from "next/image";
import homeBG from '@/img/homeBG.png';
import { Kitchen } from "@/types/Kitchens";

export default async function AllKitchens() {
  const getKitchens = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/kitchens", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch kitchens");
      return res.json();
    } catch (error) {
      console.error("❌ Error loading kitchens:", error);
      return null;
    }
  };

  const data = await getKitchens();
  if (!data?.kitchens?.length) return <p className="text-center mt-20 text-gray-600">No kitchens found.</p>;

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <Image
        src={homeBG}
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute inset-0 -z-10 brightness-90"
        priority
      />

      {/* Optional: A light gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/40 -z-10" />

      {/* Main Content */}
      <div className="relative z-10 px-6 pt-32 pb-20 text-gray-900">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-violet-900 drop-shadow-sm mb-4">
            Find Your <span className="text-violet-600">Perfect Fit</span>
          </h1>
        </section>

        {/* Kitchens Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.kitchens.map((kitchen: Kitchen) => (
            <KitchenCard
              key={kitchen._id}
              name={kitchen.name}
              maker={kitchen.maker}
              price={kitchen.price}
              description={kitchen.description}
              location={kitchen.location}
              imageUrl={kitchen.imageUrl} 
              phoneNumber={kitchen.phoneNumber}              
            />
          ))}
        </div>
      </div>
    </div>
  );
}
