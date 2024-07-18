import { Zap } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import axios from "axios"

function IsNotPro() {

  const handleOnClick = async () => {
    try{
      console.log("inside onSubscibe");
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    }catch(error){
      console.log("Stripe Error ",error);
    }
  }

  return (
    <div className="flex justify-center items-center w-full lg:mt-20">
    <Card className="flex flex-col justify-between  items-center h-64 w-72">
      <div className="font-semibold text-2xl mt-8">
        You Are On free Tier
      </div>
      <div className="text-center text-sm">
          Upgrade to Premium and get unlimited Generations!
        </div>
      <Button className="rounded-lg mb-8 bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500"
          onClick={handleOnClick}
        >
        Upgrade 
      <div className="ml-2">
        <Zap className="w-4 y-4 fill-white "/>
        </div>
      </Button>
      </Card>
    </div>
  )
}

export default IsNotPro
