"use client";
import AddKitchenForm from "@/components/AddKitchenForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddKitchenPage() {
  const router = useRouter();
  const handleSuccess = () => {
    console.log('Kitchen added successfully!');
    alert('✅ Kitchen added successfully!'); 
    router.push('/explore');
  };

  const handleCancel = () => {
    const hasUnsavedChanges = true; 
    if (hasUnsavedChanges) {
      if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        router.back();
      }
    } else {
      router.back();
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
     <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/kitchens"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Kitchens
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Kitchen</h1>
            <p className="text-gray-600">Fill in the details below to create a new kitchen listing</p>
          </div>
          <AddKitchenForm 
            showPreview={true}
            showCancelButton={true}
            submitButtonText="Create Kitchen"
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>All fields are required. Make sure to add a high-quality image for better visibility.</p>

        </div>
      </div>
    </div>
  );
}