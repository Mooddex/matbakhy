import Link from "next/link";
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string; // Call to action button
}

const Hero = ({title, subtitle, ctaText}:HeroProps) => {
  
  return (
    <div className="mb-20 pt-28">
      <div className="">
        <div className="px-4 py-16 mx-auto max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <p className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-violet-900 uppercase bg-violet-100 rounded-full">
              Find Your Perfect Kitchen
            </p>
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-white">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/explore">
                         <button
              className="h-12 px-6 font-semibold text-white bg-violet-700 rounded-md shadow hover:bg-violet-800 transition"
            >
              {ctaText}
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

};


  


export default Hero;
