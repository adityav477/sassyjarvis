import { BsExclamationTriangle } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";

export function FormError({ message, success }: { message?: string, success: null | number }) {
  if (!message) return null;

  if (success !== null) {
    return (
      <div className="bg-emerald-50 p-2 rounded-md flex justify-center items-center gap-x-2 text-sm text-emerald-500">
        <FaCircleCheck />
        {message}
      </div>
    )
  } else {
    return (

      <div className="bg-destructive/15 p-2 rounded-md flex justify-center items-center gap-x-2 text-sm text-destructive">
        <BsExclamationTriangle />
        {message}
      </div>
    )
  }
}

