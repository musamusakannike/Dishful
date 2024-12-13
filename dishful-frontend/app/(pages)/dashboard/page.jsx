"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "@/components/dashboard/Header";
import FeaturedSection from "@/components/dashboard/FeaturedSection";
import CategoryRecipes from "@/components/dashboard/CategoryRecipes";
import RecipeOptionsModal from "@/components/dashboard/RecipeOptionsModal";
import { apiRequest } from "@/lib/utils";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You're not logged in");
        router.push("/login");
        return;
      }
      const userData = await apiRequest(
        "auth/current-user",
        "GET",
        null,
        token
      );
      setUsername(userData.data.user.username);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="bg-[#fff] min-h-screen flex flex-col">
      <Header username={username} />
      <main className="flex-1 p-6 space-y-8">
        <FeaturedSection />
        <CategoryRecipes />
      </main>
      <button
        onClick={() => setModalVisible(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12H7.5M12 16.5V7.5"
          />
        </svg>
      </button>
      <RecipeOptionsModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
