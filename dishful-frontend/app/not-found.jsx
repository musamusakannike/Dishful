"use client";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-green-600">
      <div className="text-center">
        {/* Error Message */}
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Page Not Found
        </h2>
        <p className="mt-4 text-green-200">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        {/* Decorative Plant/Leaf Icon */}
        <div className="flex justify-center my-6">
          <svg
            className="w-20 h-20 text-green-300 opacity-50"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-2.83-.48-5.15-2.8-5.63-5.63H11v5.63zm6.36-1.4c-1.18-1.18-1.18-3.07 0-4.24 1.18-1.18 3.07-1.18 4.24 0 .49.49.83 1.1 1 1.76-.88.37-1.84.56-2.86.56-1.1 0-2.19-.18-3.21-.51-.6-.21-1.23-.11-1.68.35l-4.15 4.15zM5.07 13c.48-2.83 2.8-5.15 5.63-5.63V5.07C7.24 5.55 4.93 7.87 4.45 10.7c.37-.1.74-.17 1.11-.25.13-.02.25-.06.37-.09h.14zm3.54-2.25l6.36 6.36c-.26-.34-.48-.71-.67-1.1-.18-.37-.32-.77-.42-1.18-.12-.52-.15-1.06-.12-1.59-.23.04-.45.12-.66.23l-4.15 4.15c-.46.46-.57 1.09-.35 1.68-.33 1.03-.51 2.12-.51 3.21 0 1.02.19 1.98.56 2.86.66-.17 1.27-.51 1.76-1 .82-.83.82-2.17 0-3z"></path>
          </svg>
        </div>

        {/* Back Home Button */}
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2 text-lg font-semibold text-green-700 bg-white rounded-md shadow-md hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
