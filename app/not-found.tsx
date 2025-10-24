import Link from "next/link"
import { FaLinkedinIn, FaGithub, FaRocket, FaStar } from "react-icons/fa"

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 px-6 text-center relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-violet-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-pink-300/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-300/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-purple-300/20 rounded-full animate-bounce delay-700"></div>
        
        {/* Floating Stars */}
        <FaStar className="absolute top-20 left-1/4 text-yellow-400/30 text-2xl animate-pulse delay-300" />
        <FaStar className="absolute bottom-32 right-1/3 text-yellow-400/40 text-lg animate-pulse delay-1000" />
        <FaStar className="absolute top-1/3 right-20 text-yellow-400/20 text-xl animate-pulse delay-700" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Floating Rocket Icon */}
        <div className="mb-8 relative">
          <FaRocket className="text-6xl md:text-7xl text-violet-500 mx-auto animate-bounce drop-shadow-lg" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        </div>

        {/* Big 404 with Enhanced Styling */}
        <div className="relative mb-6">
          <h1 className="text-[8rem] md:text-[12rem] lg:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 drop-shadow-2xl animate-pulse leading-none">
            404
          </h1>
          <div className="absolute inset-0 text-[8rem] md:text-[12rem] lg:text-[14rem] font-black text-violet-200/10 dark:text-violet-800/10 blur-sm -z-10 leading-none">
            404
          </div>
        </div>

        {/* Subtitle with Animation */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Looks Like We Have a Problem!
          </p>
          <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400">
            This page seems to have drifted into space
          </p>
        </div>

        {/* Description with Better Styling */}
        <div className="mb-12 max-w-xl mx-auto">
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20 dark:border-gray-700/20">
            The page {`you're`} looking for {`doesn't`} exist or has been moved. 
            <br />
            <span className="font-semibold text-violet-600 dark:text-violet-400">{`Let's`} navigate you back to safety!</span>
          </p>
        </div>

        {/* Enhanced Home Button */}
        <div className="mb-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-white/20"
          >
            <FaRocket className="text-xl group-hover:animate-bounce" />
            Launch Back Home
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          </Link>
        </div>

        {/* Contact Section with Enhanced Design */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Or connect with me in the digital universe
          </h3>
          
          <div className="flex justify-center gap-8">
            <Link 
              href="https://www.linkedin.com/in/mahmoudsalama1/" 
              target="_blank"
              className="group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
            >
              <FaLinkedinIn className="text-2xl group-hover:scale-110 transition-transform" />
            </Link>
            
            <Link 
              href="https://github.com/Mooddex" 
              target="_blank"
              className="group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 dark:from-gray-600 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-800 text-white rounded-2xl shadow-lg hover:shadow-gray-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
            >
              <FaGithub className="text-2xl group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          {/* Additional Decorative Element */}
          <div className="mt-8 flex justify-center items-center gap-2 text-gray-400 dark:text-gray-500">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
            <FaStar className="text-sm animate-pulse" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-200/30 to-transparent dark:from-violet-900/30 pointer-events-none"></div>
    </div>
  )
}

export default NotFound
