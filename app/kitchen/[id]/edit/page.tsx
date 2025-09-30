import { fetchKitchenById } from "@/app/actions/kitchen";
import notFound from "@/app/not-found";
import EditKitchenForm from "@/components/kitchenComponents/EditKitchenForm"
interface EditKitchenProps{
    params: Promise<{id:string}>
};

export default async function EditKitchen({
    params,
}: EditKitchenProps) {
    const {id} = await params;
    const kitchen = await fetchKitchenById(id);
    if(!kitchen){ notFound()};    
    return(
        <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <EditKitchenForm kitchen={kitchen} />
    </div>

    )
}