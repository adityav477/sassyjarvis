"use client"
import { Button } from "@/components/ui/button";
import LogOutServer from "../logOutButton";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserInfoNavbar() {
  let name;

  const session = useSession();
  name = session?.data?.user?.name;
  console.log("name is ", name);


  return (
    <div className="flex w-full justify-end">
      <div className="flex w-full justify-end">
        <div className="grid grid-cols-3 gap-3  ">
          <Button variant="default" size="icon" className="col-span-1 rounded-full bg-slate-500">
            {name}
          </Button>
          <div className="col-span-2">
            <LogOutServer />
          </div>
        </div>
      </div>
    </div>
  )
}

