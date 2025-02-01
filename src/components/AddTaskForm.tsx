import { Icon } from "@iconify/react"
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker"
import DropDown2 from "./DropDown2";



const AddTaskForm = () => {
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });
  return (
    <div className="bg-customBg w-full h-10 py-12 border-red-100 flex items-center px-10">
        <form className="flex flex-col gap-2 justify-center ">
            <div className="flex justify-around items-center w-full gap-28">

            <input type="text" placeholder="Task Title" className="bg-customBg text-xs py font-medium ml-10 py-2  pr-10"/>
            
            <div className="relative w-full max-w-xs ml-40">
                
                <Datepicker
                    placeholder="Add date"
                    containerClassName="flex items-center text-xs border-gray-300 border-2 px-1 py-1  rounded-full"
                    inputClassName="bg-customBg "
                    value={value}
                    primaryColor="purple"
                    asSingle={true}
                    useRange={false}
                    onChange={(newValue) => setValue(newValue)}
                />
            </div>
            <div className="mr-8 px-2 py-2 mt-1 rounded-full border-2 border-gray-300">
                <DropDown2 selectType={'ic:baseline-plus'} options={["To-Do","In-progress","Completed"]}/>

            </div>
            <div className="ml-10 px-2 py-2 mt-1 rounded-full border-2 border-gray-300">

                <DropDown2 selectType={'ic:baseline-plus'} options={["Work","Personnel"]}/>
            </div>
            
            </div>
            <div className="flex gap-3 px-10">
                <button className="flex items-center gap-1 text-white bg-customPurple text-sm px-3 py-1 rounded-full" type="submit">Add <Icon icon="tdesign:enter" width="15" height="15" /></button>
                <button className="uppercase text-xs font-bold">Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default AddTaskForm