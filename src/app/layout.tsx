import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor"; // Ensure the correct path

export const metadata: Metadata = {
  title: "HONEY BHARDWAJ",
  description: "Photography and Storytelling",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <CustomCursor /> {/* Custom Cursor component */}
        {children}
      </body>
    </html>
  );
}
