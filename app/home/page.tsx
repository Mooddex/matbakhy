import KitchenCard from "@/components/KitchenCard";
import kitchens from "@/data/Kitchens";

export default function Dashboard() {
  return (
    <div className="px-6 py-12 bg-gray-50 min-h-screen text-gray-900">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-violet-900 mb-3">
          Find Your <span className="text-violet-600">Perfect Fit</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Browse beautiful kitchen styles made by trusted professionals around Egypt.
        </p>
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-violet-800">Kitchens</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {kitchens.slice(0,6).map((kitchen) => (
            <KitchenCard key={kitchen.id} {...kitchen} />
          ))}
        </div>
      </section>
    </div>
  );
}
