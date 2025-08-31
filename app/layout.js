import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Wrapper from "./Components/Wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NetFlix Clone Here",
  description: "Netflix Clone Just a Dummy Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="text-white bg-gradient-to-b from-gray-950 to-black min-h-[100dvh]">
          <Wrapper>
            <Navbar />
            {children}
          </Wrapper>
        </div>
      </body>
    </html>
  );
}
