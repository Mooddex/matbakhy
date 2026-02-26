import Image from "next/image";
import KitchensGrid from "@/components/ui/Cards/KitchensGrid";
import { User } from "@/lib/types/User";
import ShareProfile from "./shareProfile";
import EditProfile from "./editeProfile";
interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <main className="pt-20">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-violet-50 pb-16">
        <div className="max-w-7xl mx-auto px-8 pt-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
            {/* LEFT SIDE */}
            <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10">
              {/* Avatar */}
              <div className="relative">
                <div className="w-65 h-65 lg:w-[320px] lg:h-[320px] rounded-4xl shadow-2xl overflow-hidden bg-white">
                  <Image
                    src={user.avatar || "/avatar.jpg"}
                    alt={`${user.name} avatar`}
                    fill
                    priority
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-violet-900 tracking-tight">
                  {user.name}
                </h1>

                <p className="text-gray-700 max-w-2xl leading-relaxed mt-4">
                  {user.bio || "Add your professional bio here."}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 bg-white/70 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/40 shadow-sm mt-6">
                  <Stat label="Followers" value="12.5k" />
                  <Divider />
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
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-4">
              <EditProfile user={user} />
              <ShareProfile />
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="border-b border-violet-100 mt-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-12">
            <Tab active>Work</Tab>
            <Tab>Location</Tab>
            <Tab>About</Tab>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <KitchensGrid />
      </section>
    </main>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <span className="text-lg font-bold text-violet-900">{value}</span>
      <span className="text-xs uppercase tracking-wider font-semibold text-violet-600/70">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="hidden sm:block w-px h-6 bg-violet-200" />;
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
          ? "border-violet-600 text-violet-900"
          : "border-transparent text-gray-500 hover:text-violet-900"
      }`}
    >
      {children}
    </button>
  );
}
