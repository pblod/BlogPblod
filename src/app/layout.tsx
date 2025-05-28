import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../../components/general/navBar";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogPblod",
  description: "A blog platform for sharing your thoughts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <div className="max-w-7xl mx-auto px-4">
          <NavBar />
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </div>
      </body>
    </html>
  );
}
