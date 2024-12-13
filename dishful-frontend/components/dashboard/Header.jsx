import Link from "next/link";

const Header = ({ username }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10 flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold text-green-600">Dishful</h1>
      <div className="flex items-center space-x-4">
        <p className="text-gray-700 hidden sm:block">
          Welcome, <span className="font-medium">{username || "Guest"}</span>
        </p>
        <Link href="/saved">
          <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75v-.75A3.75 3.75 0 0012.75 0H11.25A3.75 3.75 0 007.5 3.75v.75m-3.75 6.75v11.25A2.25 2.25 0 006 24h12a2.25 2.25 0 002.25-2.25V10.5m-15.75 0h15.75" />
            </svg>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
