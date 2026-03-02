'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase-config';
import Link from 'next/link';

interface EditButtonProps {
  kitchenId: string;
  userId: string;
}

export default function EditButton({ kitchenId, userId }: EditButtonProps) {
  const [currentUid, setCurrentUid] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUid(user?.uid ?? null);
    });
    return () => unsub();
  }, []);

  if (currentUid !== userId) return null;

  return (
    <Link href={`${kitchenId}/edit`}>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
        Edit
      </button>
    </Link>
  );
}