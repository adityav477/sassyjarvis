import UserInfoNavbar from "./(navbar)/UserInfoNavbar";
import MobileSidebar from "./(navbar)/mobile-sidebar";

export default async function Navbar() {
  // console.log("session on use client is ");
  // console.log(data);


  return (
    <div className="flex items-center w-full px-4 py-2">
      <MobileSidebar />

      {/* the actual navbar */}
      <UserInfoNavbar />
    </div>
  )
}
