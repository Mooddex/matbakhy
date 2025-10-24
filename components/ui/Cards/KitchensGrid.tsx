"use client";

import { fetchKitchens } from "@/app/actions/kitchen";
import KitchenCard from "./KitchenCard";
import { Kitchen } from "@/types/Kitchens";
import { useState, useEffect } from "react";

export default function KitchensGrid({ }) {
   const [data, setData] = useState<Kitchen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKitchens()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {loading && <p>Loading...</p>}
      {!loading && data.map((kitchen) => (
        <KitchenCard key={kitchen.id} {...kitchen} />
      ))}
    </div>
  );
}


