"use client"
import LogOutServer from "../logOutButton";
import { useSession } from "next-auth/react";

export default function UserInfoNavbar() {

  const session = useSession();
  let name = session?.data?.user?.name;
  // console.log("name is ", name);

  return (
    <div className="flex w-full justify-end">
      <div className="grid grid-cols-3 gap-3">
        {/* {name && */}
        {/*   <Button variant="default" size="icon" className="col-span-1 rounded-full bg-blue-500 h-9 w-9"> */}
        {/*     {name[0]} */}
        {/*   </Button> */}
        {/* } */}
        <div className="col-span-2">
          <LogOutServer />
        </div>
      </div>
    </div>
  )
}

