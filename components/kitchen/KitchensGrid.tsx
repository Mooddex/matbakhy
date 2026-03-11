import { fetchUserKitchens } from "@/app/actions/kitchen";
import KitchenCard from "./KitchenCard";
import { Kitchen } from "@/lib/types/Kitchens";
import EmptyProfileState from "@/components/profile/embtyProfileState";
import { User } from "@/lib/types/User";

interface KitchensGridProps {
  userId?: string;
  user?: User; // optional
}

export default async function KitchensGrid({ userId, user }: KitchensGridProps) {
  const data: Kitchen[] = await fetchUserKitchens(userId);

  if (data.length === 0 && user) {
    return <EmptyProfileState user={user} />;
  }

  return (
    <div className="grid m-4 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((kitchen: Kitchen) => (
        <KitchenCard key={kitchen._id} {...kitchen} />
      ))}
    </div>
  );
}