'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteKitchenAction } from '@/app/actions/kitchen';

interface DeleteEditButtonsProps {
  id: string;
}

export default function DeleteEditButtons({ id }: DeleteEditButtonsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteKitchenAction(id);

      if (res.success) {
        toast.success('Kitchen deleted successfully', { autoClose: 3000 });
        router.push('/kitchen/all');
        router.refresh();
      } else {
        toast.error(res.message || 'Failed to delete kitchen');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleDelete}
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
