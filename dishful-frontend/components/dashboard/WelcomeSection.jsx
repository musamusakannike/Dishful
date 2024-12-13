import Link from "next/link";

function WelcomeSection({ username }) {
  return (
    <section className="bg-white p-8 rounded-md shadow-md mb-6 text-center space-y-4">
      <h2 className="text-3xl font-semibold text-green-900">
        Welcome back, {username}!
      </h2>
      <button className="mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-md hover:from-green-500 hover:to-green-400 transition-all">
        <Link href={"/recipe-search"}>Create New Recipe</Link>
      </button>
    </section>
  );
}

export default WelcomeSection;
