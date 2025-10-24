import Hero from '../components/layout/Hero';
import backgroundimg from '@/img/background img.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <Image
        src={backgroundimg}
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute inset-0 -z-10"
        priority
      />

      {/*  Overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-28">
        <Hero
          title="Discover & Connect with Egypt's Top Kitchen Makers"
          subtitle="Browse real kitchens built by talented makers. Compare styles, connect directly, and bring your dream kitchen to life — all in one place."
          ctaText="Get Started"
        />
      </div>
    </div>
  );
}
