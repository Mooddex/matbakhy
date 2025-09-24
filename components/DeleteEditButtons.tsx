'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteEditButtons = ({ 
  id, 
  showBackButton = true,
  onDeleteSuccess,
  size = "default" 
}: { 
  id: string;
  showBackButton?: boolean;
  onDeleteSuccess?: () => void;
  size?: "default" | "small";
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/kitchens/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // If we have a callback (for cards), use it. Otherwise navigate.
      if (onDeleteSuccess) {
        onDeleteSuccess();
      } else {
        router.push('/explore');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete the post.');
    } finally {
      setLoading(false);
    }
  };

  const buttonClasses = size === "small" 
    ? "px-3 py-1.5 text-sm font-medium rounded-md transition"
    : "px-5 py-2 font-semibold rounded-lg transition";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => router.push(`/kitchen/${id}/edit`)}
        className={`${buttonClasses} bg-blue-600 hover:bg-blue-700 text-white`}
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={`${buttonClasses} bg-red-600 text-white ${
          loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-700'
        }`}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>

      {showBackButton && (
        <button
          onClick={() => router.push('/explore')}
          className={`${buttonClasses} bg-gray-700 hover:bg-gray-800 text-white`}
        >
          Back
        </button>
      )}
    </div>
  );
};


export { DeleteEditButtons };