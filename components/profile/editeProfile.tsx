"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Button } from "../ui/Buttons/button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { EditProfileSchema, TEditProfileSchema } from "@/lib/validators";
import { updateUser } from "@/app/actions/user";
import { User } from "@/lib/types/User";
import { Upload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";

interface EditProfileProps {
  user: User;
}

export default function EditProfile({ user }: EditProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TEditProfileSchema>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firebaseUid: user.firebaseUid,
      username: user.username,
      email: user.email,
      name: user.name,
      avatar: user.avatar || "",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const submitHandler = async (data: TEditProfileSchema) => {
    console.log(data);
    try {
      const res = await updateUser(user.firebaseUid, data);
      if (res.success) {
        toast.success("Profile updated successfully", {
          autoClose: 3000,
        });
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Button
        className="w-48 h-12 bg-black text-white rounded-2xl font-semibold shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-full items-center justify-center p-4 bg-black/40">
          <DialogPanel className="w-full max-w-lg space-y-6 rounded-2xl border bg-white p-8 shadow-xl">
            <DialogTitle className="text-xl font-semibold">
              Edit Your Profile
            </DialogTitle>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
              <input type="hidden" {...register("firebaseUid")} />

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/* Image */}
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium mb-1"
                >
                  Image
                </label>
                <CldUploadButton
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
                  }
                  onSuccess={(res) => {
                    const result = res as { info: { secure_url: string } };
                    const imageUrl = result.info.secure_url;
                    setValue("avatar", imageUrl, { shouldValidate: true });
                  }}
                  className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-black focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload size={18} />
                  <span>Click to upload or drag and drop</span>
                </CldUploadButton>
                {/* <input
                  id="avatar"
                  type="text"
                  {...register("avatar")}
                  readOnly
                  className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
                />
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.avatar.message}
                  </p>
                )} */}
              </div>

              {/* name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-1">
                  Bio
                </label>
                <input
                  id="bio"
                  type="text"
                  {...register("bio")}
                  className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-lg text-white ${
                    isSubmitting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
