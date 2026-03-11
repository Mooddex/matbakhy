// app/page.tsx
import Hero from '../components/Hero';
import HeroKitchens from '@/components/kitchen/heroKitchens';
import backgroundimg from '@/img/background img.png';
import Image from 'next/image';

export default function Home() {
  return (
    // Main Container with Background Gradient
    <div className="relative min-h-screen w-full bg-linear-to-b from-transparent via-white/10 to-black/40">
      {/* Overlay Layer for Images */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={backgroundimg}
          alt="Background"
          fill
          className="absolute inset-0 -z-10 object-cover brightness-75"
          priority
          quality={90}
        />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col">
          
          {/* 1. Hero Section */}
          <div className="flex items-center justify-center pt-28 px-4 text-center min-h-[50vh]">
            <Hero
              title="Discover & Connect with Egypt's Top Kitchen Makers"
              subtitle="Browse real kitchens built by talented makers. Compare styles, connect directly, and bring your dream kitchen to life — all in one place."
              ctaText="Get Started"
            />
          </div>

          {/* 2. Kitchens Grid Section */}
          <div className="px-4 py-12 grow">
             {/* Optional Scroll Indicator for Next Section */}
            <div className="flex justify-center my-8 animate-bounce opacity-80">
              <span className='text-4xl font-bold text-indigo-800 uppercase sm:text-2xl'>Featured Kitchens</span>
            </div>
          </div>
            <HeroKitchens />

           </div>
        </div>
      </div>
  );
}