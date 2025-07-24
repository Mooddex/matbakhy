"use client";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { Loader2, ImageIcon, User, Tag, DollarSign, MapPin, Phone } from "lucide-react";
import KitchenCard from "@/components/KitchenCard";
import Image from "next/image";

export default function AddKitchenPage() {
  const [name, setName] = useState("");
  const [maker, setMaker] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newKitchen = { name, maker, price: Number(price), phoneNumber: Number(phoneNumber), description, location, imageUrl };
    try {
      const res = await fetch("/api/kitchens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newKitchen),
      });
      if (!res.ok) throw new Error("Failed to add kitchen");
      alert("✅ Kitchen added successfully!");
      // Optionally clear form here...
    } catch {
      alert("❌ Error adding kitchen.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-violet-50 px-6 py-16">
      <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-2">
        {/* Form Column */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-violet-700">Add New Kitchen</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field icon={<Tag />}     label="Title"       value={name}        onChange={setName}        placeholder="Modern Luxe"           />
            <Field icon={<User />}    label="Maker"       value={maker}       onChange={setMaker}      placeholder="Classic Interiors"     />
            <Field icon={<Phone />}   label="Phone" type="tel" value={phoneNumber} onChange={setPhoneNumber} placeholder="01012345678"          />
            <Field icon={<DollarSign />} label="Price"      value={price}       onChange={setPrice}      placeholder="45000"                 />
            <Field icon={<MapPin />}  label="Location"    value={location}    onChange={setLocation}   placeholder="Cairo"                 />
            <Field icon={<ImageIcon />} label="Description" value={description} onChange={setDescription} placeholder="Style, materials, etc." multiline />

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
                  <Image src={imageUrl} alt="Kitchen" className="w-full h-48 object-cover rounded-lg shadow" />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white transition"
                  >✕</button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-violet-700 hover:bg-violet-800 text-white py-3 rounded-full font-semibold transition transform hover:scale-105"
            >
              Submit Kitchen
            </button>
          </form>
        </div>

        {/* Preview Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Live Preview</h2>
         <KitchenCard
            name={name || "Your Kitchen Title"}
            maker={maker || "Maker Name"}
            price={price ? Number(price) : 0}
            description={description || "A brief description will appear here."}
            location={location || "Location"}
            imageUrl={imageUrl}
            phoneNumber={phoneNumber || "01012345678"}  // ← pass the real state (with a fallback)
          />

        </div>
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
  icon, label, value, onChange, placeholder = "", type = "text", multiline = false
}: FieldProps) {
  const baseCls = "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300 transition";
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
        {icon}<span>{label}</span>
      </label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required className={baseCls} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required className={baseCls} />
      }
    </div>
  );
}
