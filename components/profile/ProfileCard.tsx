import Image from "next/image";
import { User } from "@/lib/types/User";
import EditProfile from "./editeProfile";
import KitchensGrid from "../kitchen/KitchensGrid";
import AddKitchenForm from "../kitchen/AddKitchenForm";
import BackButton from "../ui/Buttons/BackButton";

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const avatarSrc =
    user.avatar ||
    "https://res.cloudinary.com/deq0w5tnr/image/upload/v1774532813/cnhlhtagnb8eklhshqx1.jpg";

  return (
    <main >
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-violet-50 pb-16">
         <BackButton />
        <div className="max-w-3xl mx-auto px-8 pt-20">
          <div className="flex flex-col items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-4xl shadow-2xl overflow-hidden bg-white border-4 border-violet-600">
                <Image
                  src={avatarSrc}
                  alt={`${user.name} avatar`}
                  fill
                  priority
                  sizes="(max-width: 768px) 160px, 224px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-violet-900 tracking-tight">
                {user.name}
              </h1>

              <p className="text-gray-700 max-w-md leading-relaxed mt-4">
                {user.bio || "Add your professional bio here."}
              </p>

              {/* Stats */}
              <div className="flex justify-center items-center gap-6 bg-white px-6 py-4 rounded-3xl border border-violet-200 shadow-sm mt-6">
                <Stat
                  label="Kitchens"
                  value={user.stats?.totalKitchens.toString() || "0"}
                />
                <Divider />
                <Stat
                  label="Member Since"
                  value={
                    user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })
                      : "—"
                  }
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-4 w-full max-w-xs items-center sm:flex-row sm:justify-center">
              <EditProfile user={user} />
              <AddKitchenForm user={user} />
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="border-b border-violet-100 mt-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-center gap-12">
            <Tab active>Work</Tab>
            <Tab>Location</Tab>
            <Tab>About</Tab>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section>
        {user.stats?.totalKitchens ? (
          <KitchensGrid userId={user.firebaseUid} user={user} />
        ) : (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <p className="text-gray-500 text-lg">
              No kitchens found. Add a kitchen to get started!
            </p>
            <span className=" text-white text-sm font-semibold px-4 py-2 rounded-full">
              <AddKitchenForm user={user} />
            </span>
          </div>
        )}
      </section>
    </main>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-bold text-violet-900">{value}</span>
      <span className="text-xs uppercase tracking-wider font-semibold text-violet-600/70">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-violet-200" />;
}

function Tab({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`py-5 border-b-4 font-semibold transition-colors ${
        active
          ? "border-red-600 text-red-700"
          : "border-transparent text-gray-500 hover:text-violet-900"
      }`}
    >
      {children}
    </button>
  );
}
