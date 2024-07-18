'use client'
import Navbar from "@/components/myComponents/navbar";
import SideBarComponent from "@/components/myComponents/sidebarComponent";
import React from "react";
import { RecoilRoot } from "recoil";
import Modal from "@/components/myComponents/modal";
import { ToasterProvider } from "@/components/myComponents/toasterProvider";

export default function DashboardLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div>
      <RecoilRoot>
        <Modal />
        <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0  bg-slate-800">
          <SideBarComponent />
        </div>
        <div className="md:pl-72">
          <ToasterProvider />
          <Navbar />
          {children}
        </div>
      </RecoilRoot>
    </div>
  )
}
