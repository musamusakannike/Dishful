"use client";
import {useRouter} from "next/navigation"

import { useEffect, useState } from "react";
import SaladImage from "@/assets/images/salad.jpeg";
import NoodlesImage from "@/assets/images/noodles.jpeg";
import AmalaImage from "@/assets/images/dinner/amalaandewedu.jpeg";
import EgusiPoundedYamImage from "@/assets/images/dinner/egusiandpoundedyam.jpeg";
import PepperSoupImage from "@/assets/images/dinner/pepper-soup.jpeg";
import AfangImage from "@/assets/images/dinner/afang.jpeg";
import AkaraAndPapImage from "@/assets/images/breakfast/akaraandpap.jpeg";
import FriedRiceImage from "@/assets/images/breakfast/fried-rice.jpeg";
import JollofRiceImage from "@/assets/images/breakfast/jollof.jpeg";
import Image from "next/image";

const FeaturedSection = () => {
  const router = useRouter()
  const [randomItems, setRandomItems] = useState([]);

  const featuredItems = [
    {
      id: "1",
      title: "Asian white noodle with extra seafood",
      author: "Dishful",
      time: "20 Min",
      image: NoodlesImage,
    },
    {
      id: "2",
      title: "Healthy salad with fresh veggies",
      author: "Dishful",
      time: "15 Min",
      image: SaladImage,
    },
    {
      id: "3",
      title: "Amala with Ewedu",
      author: "Dishful",
      time: "25 Min",
      image: AmalaImage,
    },
    {
      id: "4",
      title: "Egusi with Pounded Yam",
      author: "Dishful",
      time: "30 Min",
      image: EgusiPoundedYamImage,
    },
    {
      id: "5",
      title: "Pepper Soup",
      author: "Dishful",
      time: "40 Min",
      image: PepperSoupImage,
    },
    {
      id: "6",
      title: "Afang Soup",
      author: "Dishful",
      time: "35 Min",
      image: AfangImage,
    },
    {
      id: "7",
      title: "Akara and Pap",
      author: "Dishful",
      time: "15 Min",
      image: AkaraAndPapImage,
    },
    {
      id: "8",
      title: "Fried Rice",
      author: "Dishful",
      time: "20 Min",
      image: FriedRiceImage,
    },
    {
      id: "9",
      title: "Jollof Rice",
      author: "Dishful",
      time: "20 Min",
      image: JollofRiceImage,
    },
  ];

  useEffect(() => {
    // Shuffle the array and select the first 3 items
    const shuffled = [...featuredItems].sort(() => Math.random() - 0.5);
    setRandomItems(shuffled.slice(0, 3));
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-green-700">Featured</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {randomItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {router.push(`/search/${item.title}`)}}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition"
          >
            <Image
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-green-800">{item.title}</h3>
              <p className="text-sm text-gray-600">Time: {item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
