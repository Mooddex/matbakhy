import { fetchKitchenById } from "@/app/actions/kitchen";
import { notFound } from "next/navigation";
import EditKitchenForm from "@/components/kitchenComponents/EditKitchenForm";
import BackButton from "@/components/BackButton";

interface EditKitchenProps {
  params: { id: string };
}

export default async function EditKitchen({ params }: EditKitchenProps) {
  const { id } =await params;
  const kitchen = await fetchKitchenById(id);

  if (!kitchen) {
    notFound();
  }

  return (
    <section className="min-h-screen w-full  flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl space-y-8">
        <BackButton />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Edit Kitchen Details
          </h1>
          <p className="text-violet-300">
            Update the information below and save changes.
          </p>
        </div>

        <div className="bg-violet-800  border border-violet-800 rounded-2xl shadow-md p-6">
          <EditKitchenForm kitchen={kitchen} />
        </div>
      </div>
    </section>
  );
}
