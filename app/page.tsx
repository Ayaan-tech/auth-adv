"use client";
import Image from "next/image";
import { Button} from "@/components/ui/button"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
const font = Poppins({
  subsets: ["latin"],
  weight:["600"]
})
export default function Home() {
  return (
   <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,__var(--tw-gradient-stops))] from-sky-400 to-blue-800">
    <div className="space-y-6 text-center">
      <h1 className={cn("text-9xl font-semibold text-white drop-shadow-md",font.className)}> Auth🔐</h1>
      <p className="text-2xl text-white"> A simple Authentication service</p>
      <div>
        <LoginButton>
        <Button variant="secondary" size="lg">Sign In</Button>
        </LoginButton>
      </div>
    </div>
   </main>
  );
}
