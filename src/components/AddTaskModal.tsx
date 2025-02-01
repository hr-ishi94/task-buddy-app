
import { FC, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValue } from "../types/types";

const AddTaskModal:FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [value, setValue] = useState<DateValue>({ 
        startDate: null, 
        endDate: null
    });

    const handleDateChange = (newValue: DateValue):void => {
        setValue(newValue);
      };

    return (
    <div>
        <button className=" bg-customPurple rounded-full text-xs text-white px-5 py-3 " onClick={() => setIsOpen(true)}>ADD TASK</button>
        
        {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 max-md:items-end overflow-y-auto">
            <div className="relative w-2/5 h-[85%] bg-white rounded-lg shadow-sm max-md:w-full max-md:h-[92%]">
            <div className="flex items-center justify-between p-4 border-b-2 rounded-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Task
                </h3>
                <button
                onClick={() => setIsOpen(false)}
                className="text-black bg-transparent  hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
                <span className="sr-only ">Close modal</span>
                </button>
            </div>

            
            <form className="p-4 md:p-5 ">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <input
                        type="text"
                        name="task_title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:outline-none focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Task Title"
                        required
                        />
                    </div>
                    <div className="col-span-2">
                        
                    <RichTextEditor/>
                    </div>
                    
                    <div className="col-span-2 flex justify-evenly gap-16 max-md:flex-col max-md:gap-2 ">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-600 gap-1">Task Category*</label>
                            <div className="flex gap-2 text-sm ">
                                <a className=" px-3 text-xs font-medium rounded-full border-2 py-2 hover:bg-customBg focus:ring-purple-700 cursor-pointer">Work</a>
                                <a className=" px-3 text-xs font-medium rounded-full border-2 py-2 hover:bg-customBg focus:ring-purple-700 cursor-pointer">Personal</a>
                            </div>

                        </div>
                        <div className="flex flex-col gap-1"> 
                            <label className="text-xs text-gray-600 ">Due on*</label>
                            <div className="relative w-full bg-customBg rounded-lg max-md:w-2/3">
                
                                <Datepicker
                                    placeholder="DD/MM/YYYY"
                                    containerClassName="flex items-center text-xs border-gray-300 border-2 px-1 py-2  rounded-lg max-md:w-full"
                                    inputClassName="bg-customBg text-xs "
                                    value={value}
                                    primaryColor="purple"
                                    asSingle={true}
                                    useRange={false}
                                    onChange={handleDateChange}
                                />
                            </div>
                       
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-600">
                            Task Status*
                            </label>
                            <select className="bg-customBg border border-gray-300  text-gray-500 text-xs font-medium rounded-lg focus:outline-none block w-full pr-12 py-2 max-md:w-2/3">
                                <option disabled>Choose</option>
                                <option value="TO-DO">TO-DO</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm text-gray-600">Attachment</label>
                        <div className="w-full bg-customBg rounded-lg border-gray-300 border-2 py-2">
                            <h1 className="text-center text-xs">Drop your files here or <span className="underline text-blue-700">Upload</span></h1>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 absolute w-full rounded-lg bottom-0 left-0 bg-customBg px-2 py-2">
                    <button onClick={() => setIsOpen(false)} className="uppercase border-2 px-5 py-2 rounded-full hover:bg-purple-50 text-sm font-medium bg-white">Cancel</button>
                    <button
                    type="submit"
                    className="text-white inline-flex items-center opacity-35 bg-customPurple rounded-full uppercase hover:opacity-65 font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2 text-center"
                    >
                   
                    create
                </button>
                </div>
            </form>
            </div>
        </div>
        )}
    </div>
    );
};

export default AddTaskModal;
