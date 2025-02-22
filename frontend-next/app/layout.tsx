import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"


const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" >
      <body className={`${poppins.className} min-h-screen antialiased`}>
        <Toaster />
        {children}
      </body>
    </html >
  );
}
