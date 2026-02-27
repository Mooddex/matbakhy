import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Cancel() {
    const router = useRouter();
     const handleCancel = () => {
    const hasUnsavedChanges = true; 
    if (hasUnsavedChanges) {
      if (toast.info(' unsaved changes is lost.',
        {
          autoClose: 2000,
        }
      )){
        router.back();
      }
    } else {
      router.back();
    };
  };
    return(
        <div className="flex gap-2">
  <button
    type="button"
    onClick={() => handleCancel()}
    className="px-4 py-2 rounded border bg-blue-600 text-white hover:bg-blue-950 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 w-full">
    Cancel
  </button>
  
</div>
    )
}