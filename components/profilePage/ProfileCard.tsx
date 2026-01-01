import { Button } from "../ui/Buttons/button";
import Image from "next/image";
import pic from "@/assets/profilepic.jpeg";
import KitchensGrid from "../ui/Cards/KitchensGrid";
import { User } from "@/types/User";

interface ProfileCardProps {
  user :User ;
}


export default function ProfileCard({user}: ProfileCardProps) {

  return (
    <section className="min-h-screen">
     
      <div className=" mt-30 space-y-3">
<div className="grid lg:grid-cols-3 justify-items-center gap-1.5  ">
        <Image
          src={pic}
          alt="profile picture"
          width={200}
          height={120}
          className="rounded-4xl  border-transparent "
        />
        <div className="space-y-3 flex flex-col justify-center ">
          <h1 className="text-2xl sm:text-4xl font-bold text-center">m s</h1>
          <span className="max-w-lg text-center sm:text-2xl">
            Lorem ipsum dol adipisicing elit. Quibusdam sunt tempore
            voluptateaperiam facere quo rerum
          </span>
          <div className="flex justify-center gap-2 ">
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
        <div className=" ">
          <ul className="flex gap-8 ">
            <li>work</li>
            <li>Location</li>
            <li>About</li>
          </ul>
        </div>
        <KitchensGrid />
      </div>
      </div>
      
    </section>
  );
}
