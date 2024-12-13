import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "animate.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Dishful",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
