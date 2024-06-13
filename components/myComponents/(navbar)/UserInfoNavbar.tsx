import { Button } from "@/components/ui/button";
import LogOutServer from "../logOutButton";
import { auth } from "@/auth";

export default async function UserInfoNavbar() {
  const data = await auth();
  return (

    <div className="flex w-full justify-end">
      <div className="grid grid-cols-3 gap-3  ">
        <Button variant="default" size="icon" className="col-span-1 rounded-full bg-slate-400">
          {data?.user?.name}
        </Button>
        {/* <Button variant="default" size="icon" className="col-span-2 text-center w-full rounded-lg bg-slate-400" */}
        {/*   onClick={() => signOut()} */}
        {/* > */}
        {/*   LogOut */}
        {/* </Button> */}
        <div className="col-span-2">
          <LogOutServer />
        </div>
      </div>
    </div>
  )
}

