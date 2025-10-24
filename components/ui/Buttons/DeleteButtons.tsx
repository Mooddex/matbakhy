'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteKitchenAction } from '@/app/actions/kitchen';

interface DeleteButtonsProps {
  id: string;
  kitchenName: string;
}

export default function DeleteButtons({ id, kitchenName }: DeleteButtonsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteKitchen = async (id: string) => {
    try {
      const res = await deleteKitchenAction(id);
      return res.success;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  const handleDelete = async (kitchenName: string) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{kitchenName}</span>?
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={async () => {
                setLoading(true);
                const success = await handleDeleteKitchen(id);

                if (success) {
                  toast.success("Kitchen deleted successfully", {
                    autoClose: 2000,
                  });
                  router.push('/kitchen/all');
                  router.refresh();
                } else {
                  toast.error("Failed to delete kitchen", {
                    autoClose: 3000,
                  });
                }

                setLoading(false);
                closeToast?.();
              }}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Yes'}
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleDelete(kitchenName)} // ✅ FIXED: Now passes kitchenName
        disabled={loading}
        className={`bg-red-600 text-white px-4 py-2 rounded ${
          loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-700 cursor-pointer'
        }`}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}