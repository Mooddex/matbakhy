"use client";

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditKitchenSchema, TEditKitchenSchema } from "@/lib/validators";
import { Kitchen } from "@/lib/types/Kitchens";
import { updateKitchenAction } from "@/app/actions/kitchen";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { Upload, Loader2 } from "lucide-react";

interface EditProductFormProps {
  kitchen: Kitchen;
}

export default function EditKitchenForm({ kitchen }: EditProductFormProps) {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TEditKitchenSchema>({
    resolver: zodResolver(EditKitchenSchema),
    defaultValues: kitchen,
  });

  const submitHandler = async (data: TEditKitchenSchema) => {
    try {
      const res = await updateKitchenAction(kitchen.id, data);
      if (res.success) {
        toast.success(`${kitchen.name} updated successfully`, {
          autoClose: 3000,
        });
        router.push(`/kitchen/${kitchen.id}`);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update kitchen");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-2xl mx-auto space-y-6 p-6 rounded-2xl border border-violet-800 bg-violet-950 shadow-md"
    >
      <h2 className="text-2xl font-semibold text-white">Edit Kitchen</h2>

      {/* Name */}
      <div>
        <input type="hidden" {...register("id")} />
{errors.id && (
          <p className="text-red-400 text-sm mt-1">{errors.id.message}</p>
        )}
        <label
          htmlFor="name"
          className="block text-sm font-medium text-violet-200 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full rounded-lg border border-violet-700 bg-violet-900 p-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Maker */}
      <div>
        <label className="block text-sm font-medium text-violet-200 mb-1">
          Made By
        </label>
        <input
          {...register("maker")}
          className="w-full rounded-lg border border-violet-700 bg-violet-900 p-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
        />
        {errors.maker && (
          <p className="text-red-400 text-sm mt-1">{errors.maker.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-violet-200 mb-1">
          Price
        </label>
        <input
          type="number"
          step="any"
          {...register("price", { valueAsNumber: true })}
          className="w-full rounded-lg border border-violet-700 bg-violet-900 p-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
        />
        {errors.price && (
          <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-violet-200 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          {...register("phoneNumber")}
          className="w-full rounded-lg border border-violet-700 bg-violet-900 p-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
        />
        {errors.phoneNumber && (
          <p className="text-red-400 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-violet-200 mb-1">
          Description
        </label>
        <textarea
          rows={4}
          {...register("description")}
          className="w-full rounded-lg border border-violet-700 bg-violet-900 p-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-violet-200 mb-1">
          Store Location
        </label>
        <input
          {...register("location")}
          className="w-full rounded-lg border border-violet-700 bg-violet-900 p-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
        />
        {errors.location && (
          <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium text-violet-200 mb-1">
          Image
        </label>
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          onSuccess={(res) => {
            const result = res as { info: { secure_url: string } };
            const imageUrl = result.info.secure_url;
            setValue("imageUrl", imageUrl, { shouldValidate: true });
          }}
          className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-violet-700 bg-violet-900 p-3 text-violet-300 hover:border-red-700 hover:text-red-400 transition-colors cursor-pointer"
        >
          <Upload size={18} />
          <span>Click to upload or drag and drop</span>
        </CldUploadButton>
        <input
          type="text"
          {...register("imageUrl")}
          
          className="display-none"
        />
        {errors.imageUrl && (
          <p className="text-red-400 text-sm mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
          isSubmitting
            ? "bg-red-800 cursor-not-allowed"
            : "bg-red-900 hover:bg-red-800"
        }`}
      >
        {isSubmitting && <Loader2 className="animate-spin" size={18} />}
        {isSubmitting ? "Saving..." : "Update Kitchen"}
      </button>
    </form>
  );
}
