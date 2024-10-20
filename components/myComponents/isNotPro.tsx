import { Zap, Brain } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import axios from "axios"
import LogOutServer from "./logOutButton"
import LoaderButton from "./LoaderButton"

function IsNotPro() {

  const handleOnClick = async () => {
    try {
      console.log("inside onSubscibe");
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("Stripe Error ", error);
    }
  }

  return (
    <div className="flex justify-center items-center w-full ">
      <Card className="flex flex-col justify-between text-center shadow-lg shadow-zinc-300 h-96 md:w-96">
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-2xl mt-8">
            You Are On free Tier
          </div>
          <div className="text-center text-sm">
            Upgrade to Premium and get unlimited Generations!
          </div>
        </div>
        <div className="flex justify-center">
          <Brain size={96} strokeWidth={1} />
        </div>
        <div className="flex flex-col items-center gap-4 my-4 mx-8 ">
          <Button className="rounded-lg bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 w-full"
            onClick={handleOnClick}
          >
            Upgrade
            <div className="ml-2">
              <Zap className="w-4 y-4 fill-white " />
            </div>
          </Button>
          <LogOutServer />
        </div>
      </Card >
    </div >
  )
}

export default IsNotPro
