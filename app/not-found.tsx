import Link from "next/link"

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-100 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 text-center">
      {/* Big 404 */}
      <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-violet-600 drop-shadow-lg animate-bounce">
        404
      </h1>

      {/* Subtitle */}
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Oops! Page Not Found
      </p>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg">
        The page you’re looking for doesn’t exist or has been moved or Upgradded.  
        Let’s get you back on track.
      </p>

      {/* Home Button */}
      <Link
        href="/"
        className="inline-block bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-2xl font-medium shadow-md hover:shadow-xl transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
