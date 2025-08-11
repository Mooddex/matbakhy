"use client";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { Loader2, ImageIcon, User, Tag, DollarSign, MapPin, Phone } from "lucide-react";
import KitchenCard from "@/components/KitchenCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AddKitchenFormProps {
  showPreview?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  submitButtonText?: string;
  showCancelButton?: boolean;
}

export default function AddKitchenForm({ 
  showPreview = true, 
  onSuccess,
  onCancel,
  submitButtonText = "Submit Kitchen",
  showCancelButton = false
}: AddKitchenFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [maker, setMaker] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setMaker("");
    setPrice("");
    setPhoneNumber("");
    setDescription("");
    setLocation("");
    setImageUrl("");
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newKitchen = { 
      name, 
      maker, 
      price: Number(price), 
      phoneNumber: Number(phoneNumber), 
      description, 
      location, 
      imageUrl 
    };
    
    try {
      const res = await fetch("/api/kitchens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newKitchen),
      });
      
      if (!res.ok) throw new Error("Failed to add kitchen");
      
      alert("✅ Kitchen added successfully!");
      
      if (onSuccess) {
        onSuccess();
      } else {
        resetForm();
        router.push("/explore");
      }
    } catch {
      alert("❌ Error adding kitchen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const formContent = (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Field 
          icon={<Tag />} 
          label="Title" 
          value={name} 
          onChange={setName} 
          placeholder="Modern Luxe" 
        />
        <Field 
          icon={<User />} 
          label="Maker" 
          value={maker} 
          onChange={setMaker} 
          placeholder="Classic Interiors" 
        />
        <Field 
          icon={<Phone />} 
          label="Phone" 
          type="tel" 
          value={phoneNumber} 
          onChange={setPhoneNumber} 
          placeholder="01012345678" 
        />
        <Field 
          icon={<DollarSign />} 
          label="Price" 
          value={price} 
          onChange={setPrice} 
          placeholder="45000" 
        />
        <Field 
          icon={<MapPin />} 
          label="Location" 
          value={location} 
          onChange={setLocation} 
          placeholder="Cairo" 
        />
        <Field 
          icon={<ImageIcon />} 
          label="Description" 
          value={description} 
          onChange={setDescription} 
          placeholder="Style, materials, etc." 
          multiline 
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kitchen Image</label>
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
            onSuccess={(res) => {
              const result = res as { info: { secure_url: string } };
              setImageUrl(result.info.secure_url);
              setUploading(false);
            }}
            onUpload={() => setUploading(true)}
            options={{ maxFiles: 1 }}
            className="w-full flex justify-center items-center border-2 border-dashed border-violet-300 rounded-xl p-6 cursor-pointer hover:border-violet-500 transition"
          >
            {uploading
              ? <Loader2 className="animate-spin text-violet-600" size={24} />
              : <span className="text-gray-600">Click or Drop to Upload</span>
            }
          </CldUploadButton>

          {imageUrl && (
            <div className="mt-4 relative">
              <Image 
                src={imageUrl} 
                alt="Kitchen" 
                width={400} 
                height={192} 
                className="w-full h-48 object-cover rounded-lg shadow" 
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white transition"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {showCancelButton && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-full font-semibold transition disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className={`${showCancelButton ? 'flex-1' : 'w-full'} bg-violet-700 hover:bg-violet-800 disabled:bg-gray-400 text-white py-3 rounded-full font-semibold transition transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Adding Kitchen...
              </>
            ) : (
              submitButtonText
            )}
          </button>
        </div>
      </form>
    </div>
  );

  if (!showPreview) {
    return formContent;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form Column */}
      {formContent}

      {/* Preview Column */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Live Preview</h3>
        <KitchenCard
          name={name || "Your Kitchen Title"}
          maker={maker || "Maker Name"}
          price={price ? Number(price) : 0}
          description={description || "A brief description will appear here."}
          location={location || "Location"}
          imageUrl={imageUrl}
          phoneNumber={phoneNumber || "01012345678"}
          showActions={false}
        />
      </div>
    </div>
  );
}

type FieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
};

function Field({
  icon, 
  label, 
  value, 
  onChange, 
  placeholder = "", 
  type = "text", 
  multiline = false
}: FieldProps) {
  const baseCls = "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300 transition";
  
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
        {icon}<span>{label}</span>
      </label>
      {multiline
        ? <textarea 
            rows={3} 
            value={value} 
            onChange={e => onChange(e.target.value)} 
            placeholder={placeholder} 
            required 
            className={baseCls} 
          />
        : <input 
            type={type} 
            value={value} 
            onChange={e => onChange(e.target.value)} 
            placeholder={placeholder} 
            required 
            className={baseCls} 
          />
      }
    </div>
  );
}