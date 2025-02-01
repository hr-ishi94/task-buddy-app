import { FC } from "react"
import AddTaskModal from "./AddTaskModal"
import DropDown from "./DropDown"

const Filters:FC = () => {
  return (
    <div className="flex justify-between mx-10 max-md:flex-col max-md:gap-2 max-md:mt-5" >
        <div className=" md:hidden flex justify-end  ">
          {/* <button className=" bg-customPurple rounded-full text-xs text-white px-5 py-3">ADD TASK</button> */}
          <AddTaskModal/>
        </div>
        <div className="flex justify-center items-center gap-2 max-md:flex-col max-md:items-start max-md:justify-start ">
          <h1 className="text-gray-600 text-sm font-medium mx-1">Filter by:</h1>
          <div className="flex gap-2">
          <DropDown />
          <DropDown />

          </div>
        </div>
        <div className="flex gap-2">
  <form className="flex-grow max-md:flex-grow">   
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input 
        type="search" 
        className="block w-full p-2 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-2xl bg-white max-md:w-full focus:outline-none focus:bg-customBg" 
        placeholder="Search"  
        required 
      />
    </div>
  </form>
  <div className="max-md:hidden">
    
  <AddTaskModal />


  </div>

</div>

    </div>
  )
}

export default Filters