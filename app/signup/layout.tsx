import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex justify-center items-center">
    {children}
  </div>
}
