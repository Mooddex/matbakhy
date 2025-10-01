"use client";

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditKitchenSchema, TEditKitchenSchema } from "@/lib/validators";
import { Kitchen } from "@/types/Kitchens";
import {  updateKitchenAction } from "@/app/actions/kitchen";
import { useRouter } from "next/navigation";

interface AddProductFormProps {
  kitchen: Kitchen;
}

export default function EditKitchenForm({ kitchen }: AddProductFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TEditKitchenSchema>({
    resolver: zodResolver(EditKitchenSchema),
    defaultValues: kitchen,
  });

  const submitHandler = async (data: TEditKitchenSchema) => {
    const res = await updateKitchenAction(kitchen.id, data);
    if (res.success) {
     await toast.success(`${kitchen.name} updated successfully`, {
        autoClose: 3000,
      });
      router.push(`/kitchen/${kitchen.id}`)
      router.refresh()
    } else {
      console.error(res.error);
      toast.error(
        res.message || "Something went wrong while updating the Product"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4 p-4 border rounded"
    >
      <div>
        <label className="block text-sm">Name</label>
        <input {...register("name")} className="border p-2 w-full rounded" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
          {/* maker */}
      <div>
        <label className="block text-sm">Made By</label>
        <input
          {...register("maker")}
          className="border p-2 w-full rounded"
        />
        {errors.maker && (
          <p className="text-red-500 text-sm">{errors.maker.message}</p>
        )}
      </div>
          {/* price */}
      <div>
        <label className="block text-sm">Price</label>
        <input
          {...register("price", { valueAsNumber: true })}
          type="number"
          step="any"
          className="border p-2 w-full rounded"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>
      {/* phone */}
      <div>
        <label className="block text-sm">Phone Number</label>
        <input
          {...register("phoneNumber")}
          type="tel"
          className="border p-2 w-full rounded"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>
      {/* description */}
      <div>
        <label className="block text-sm">description</label>
        <input
          {...register("description")}
          className="border p-2 w-full rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      {/* Location */}
      <div>
        <label className="block text-sm">Store Location</label>
        <input
          {...register("location")}
          className="border p-2 w-full rounded"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>
      {/* Images */}
      <div>
        <label className="block text-sm">Thumbnail</label>
        <input
          {...register("imageUrl")}
          className="border p-2 w-full rounded"
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 rounded text-white transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 cursor-pointer"
        }`}
      >
        {isSubmitting ? "Saving..." : "Update Kitchen"}
      </button>
    </form>
  );
}
