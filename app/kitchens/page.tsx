import KitchenCard from "@/components/KitchenCard";
import kitchens from "@/data/Kitchens";

const Kitchens = () => {
  return (
    <div className="px-4 py-12 bg-gray-50 text-gray-900 min-h-screen">
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-violet-900 mb-6 text-center">
          All Kitchens
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kitchens.map((kitchen) => (
            <KitchenCard key={kitchen.id} {...kitchen} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Kitchens;
