
import Navbar from "@/components/myComponents/navbar";
import SideBarComponent from "@/components/myComponents/sidebarComponent";
import React from "react";

export default function DashboardLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-slate-800">
        <SideBarComponent />
      </div>
      <div className="md:pl-72">
        <Navbar />
        {children}
      </div>
    </div>
  )
}
