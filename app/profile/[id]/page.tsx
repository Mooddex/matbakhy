import { getUser } from "@/app/actions/user";
import NotFound from "@/app/not-found";
import ProfileCard from "@/components/ProfileCard";
import { User } from "@/lib/types/User";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // Await params in Next.js 15+
  const { id } = await params; // firebaseUid

  let user: User | null = null;

  try {
    user = await getUser(id);
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }

  if (!user) {
    return <NotFound />;
  }

  return <ProfileCard user={user} />;
};

export default ProfilePage;