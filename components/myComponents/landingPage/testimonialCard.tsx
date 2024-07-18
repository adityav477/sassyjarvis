"uee client"

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"


function TestimonialCard({ name, testimony, description }: { name: string, testimony: string, description: string }) {
  return (
    <div className="text mx-auto hover:scale-105 hover:duration-500 transition">
      <Card className="py-6 text-white  bg-transparent">
        <CardTitle className="flex justify-center items-center pb-4">
          <div className="flex justify-between items-center w-full gap-2 px-4">
            <div className="flex flex-col items-start">
              <div className="text-xl font-semibold">
                {name}
              </div>
              <div className="text-xs text-zinc-300">
                {description}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center text-black h-8 w-8 bg-white rounded-full p-2 mx-4">
            {name[0]}
          </div>
        </CardTitle>
        <CardContent className="text-start">
          {`"${testimony}"`}
        </CardContent>
      </Card>
    </div>
  )
}

export default TestimonialCard
