import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader:FC=()=> {
  return (
    <div className="flex items-center justify-center h-screen">

    <RotatingLines
      strokeColor="#7B1984"
      strokeWidth="5"
      animationDuration="0.5"
      width="50"
      visible={true}
      />
      </div>
  )
}


export default Loader