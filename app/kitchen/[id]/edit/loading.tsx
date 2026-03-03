// app/profile/[id]/loading.tsx
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="w-16 h-16 text-red-600" />
    </div>
  )
}