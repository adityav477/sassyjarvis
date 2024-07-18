"use client"
import UserInfoNavbar from "./navbar/UserInfoNavbar";
import MobileSidebar from "./navbar/mobile-sidebar";

export default function Navbar() {
  return (
    <div className="flex items-center w-full px-4 py-2">
      <MobileSidebar />

      {/* the actual navbar */}
      <UserInfoNavbar />
    </div>
  )
}
