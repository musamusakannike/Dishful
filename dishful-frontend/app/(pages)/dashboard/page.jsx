"use client";
import { apiRequest, getToken } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "@/components/dashboard/Header";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import QuickLinks from "@/components/dashboard/QuickLinks";
import RecipeSuggestions from "@/components/dashboard/RecipeSuggestions";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const fetchUserDetails = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("You're not logged in", {
          duration: 2000,
        });
        router.push("/login");
      }
      const userData = await apiRequest(
        "auth/current-user",
        "GET",
        null,
        token
      );
      setUsername(userData.data.user.username);
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred, Please have patience while we're fixing it",
        {
          duration: 3000,
        }
      );
      router.push("/login");
    }
  };

  const fetchData = async () => {
    fetchUserDetails();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <WelcomeSection username={username} />
        <QuickLinks />
        <RecipeSuggestions />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
