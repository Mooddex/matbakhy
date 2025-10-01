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
      <EditKitchenForm kitchen={kitchen} />
    )
}