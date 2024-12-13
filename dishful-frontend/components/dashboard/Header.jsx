import { Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  return (
    <header className="bg-green-700 text-white p-2 md:p-4 flex items-center justify-between">
      <h1
        className={`text-xl md:text-2xl font-medium md:font-semibold lg:font-bold ${
          showMobileSearch && "hidden sm:block"
        }`}
      >
        Dishful
      </h1>
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <Search className="absolute top-2 left-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes"
            className="pl-10 pr-4 py-2 rounded-md focus:outline-none text-gray-700"
          />
        </div>
        {showMobileSearch && (
          <div className="relative sm:hidden">
            <input
              type="text"
              placeholder="Search recipes"
              className="pl-2 pr-4 py-2 rounded-md focus:outline-none text-gray-700 min-w-[250px]"
            />
          </div>
        )}
        <Search
          className="w-6 h-6 cursor-pointer sm:hidden"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        />
        <Link href={"/profile"}>
        <User
          className={`w-6 h-6 cursor-pointer ${
            showMobileSearch && "hidden sm:block"
          }`}
        /></Link>
      </div>
    </header>
  );
}

export default Header;
