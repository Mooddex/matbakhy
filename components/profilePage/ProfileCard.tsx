import BackButton from "../ui/Buttons/BackButton";
import { Button } from "../ui/Buttons/button";
import Image from "next/image";
import pic from "@/assets/profilepic.jpeg";
import Link from "next/link";
import { Plus } from "lucide-react";

interface ProfileCardProps {
  userName?: string;
  profileImage?: string;
}

export default function ProfileCard({
  userName = "Mahmoud salama",
}: ProfileCardProps) {
  return (
    <section className="min-h-screen bg-red-300">
     
      <div className=" mt-30 space-y-3">
<div className="grid lg:grid-cols-3 justify-items-center  ">
        <Image
          src={pic}
          alt="profile picture"
          width={200}
          height={120}
          className="rounded-4xl border-4 border-white "
        />
        <div className="space-y-3 flex flex-col justify-center ">
          <h1 className="text-2xl font-bold text-center">{userName}</h1>
          <span className="max-w-lg text-center">
            Lorem ipsum dol adipisicing elit. Quibusdam sunt tempore
            voluptateaperiam facere quo rerum
          </span>
          <div className="flex justify-center gap-2">
            <Button variant="destructive" className="bg-black px-8">
              Follow
            </Button>
            <Button variant="outline" className="">
              Get in touch
            </Button>
          </div>
        </div>
      </div>

      <div className=" grid gap-3 justify-items-center ">
        <div className="border-b ">
          <ul className="flex gap-3 ">
            <li>work</li>
            <li>Location</li>
            <li>About</li>
          </ul>
        </div>
      </div>
      </div>
      
    </section>
  );
}
