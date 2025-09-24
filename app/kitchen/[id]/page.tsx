// app/kitchen/[id]/page.tsx - FIXED VERSION
import { getKitchenById } from "@/app/actions/kitchen";
import Image from "next/image";
import Link from "next/link";
import { User, Phone, MapPin, DollarSign, ArrowLeft } from "lucide-react";
import { DeleteEditButtons } from "@/components/DeleteEditButtons";
import { notFound } from "next/navigation";
import { Kitchen } from "@/types/Kitchens";
export default async function KitchenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let Kitchen;
  // get the kitchen details by its id
  try {
    Kitchen = await getKitchenById(id);
  } catch (error) {
    console.error("Failed to fetch kitchen:", error);
    notFound(); // This will show a 404 page
  }

  if (!Kitchen) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/explore" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 transition">
            <ArrowLeft size={20} />
            Back to Explore
          </Link>
        </div>
      </div>

      {/* Kitchen Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Kitchen Image */}
            <div className="relative h-96 w-full">
              <Image
                src={Kitchen.imageUrl || "/default-kitchen.jpg"}
                alt={Kitchen.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Kitchen Info */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-bold text-violet-900">{Kitchen.name}</h1>
                <div className="flex items-center gap-2 text-2xl font-semibold text-violet-600">
                  <DollarSign size={28} />
                  <span>{Kitchen.price} EGP</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{Kitchen.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Kitchen Details</h3>
                  <div className="flex items-center gap-3 text-gray-600">
                    <User size={20} className="text-violet-600" />
                    <div>
                      <span className="text-sm text-gray-500">Made by</span>
                      <p className="font-semibold text-gray-800">{Kitchen.maker}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={20} className="text-violet-600" />
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-semibold text-gray-800">{Kitchen.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={20} className="text-violet-600" />
                    <div>
                      <span className="text-sm text-gray-500">Phone Number</span>
                      <p className="font-semibold text-gray-800">{Kitchen.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <a
                    href={`tel:${Kitchen.phoneNumber}`}
                    className="w-full h-10 md:w-auto inline-flex items-center justify-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-700 transition text-lg"
                  >
                    <Phone size={20} />
                    Contact {Kitchen.maker}
                  </a>
                  {/* Pass the actual kitchen ID, not empty string */}
                  <DeleteEditButtons id={Kitchen._id || Kitchen.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
