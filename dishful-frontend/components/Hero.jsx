"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroImage from "../assets/images/hero.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 pt-20 sm:pt-24 md:pt-28 lg:pt-36"
    >
      {/* Hero Text Section */}
      <motion.div className="max-w-4xl mx-6 md:mx-0 text-center">
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-6xl font-bold text-white mb-4"
        >
          Discover Delicious Dishes with Dishful
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-emerald-100 mb-8"
        >
          Dishful is an AI-powered recipe generator that can create
          mouthwatering dishes from your text and images.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex justify-center space-x-4"
        >
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-emerald-100 text-emerald-700 font-bold py-3 px-6 rounded-full transition-colors duration-300"
          >
            Get Started
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
          >
            Download APK
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Hero Image Section */}
      <motion.div className="mt-16 md:mt-24" variants={imageVariant}>
        <Image
          src={HeroImage}
          alt="Dishful app screenshot"
          className="rounded-t-3xl md:rounded-t-[85px] shadow-lg md:max-w-[80vw] h-auto"
        />
      </motion.div>
    </motion.div>
  );
}
