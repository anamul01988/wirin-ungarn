import { Spinner } from "@material-tailwind/react";
 
export function DefaultSpinner() {
  return (
    <div className="flex justify-center items-center min-h-40 w-full">
      <Spinner />
    </div>
  );
}