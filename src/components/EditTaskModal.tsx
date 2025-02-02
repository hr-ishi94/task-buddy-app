import { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import Datepicker from "react-tailwindcss-datepicker";
import { Icon } from "@iconify/react";
import { TaskType } from "../types/types";

const EditTaskModal = ({task,isCompleted}:{task?:TaskType}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });
    
    const [details, setDetails] = useState<boolean>(false)

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    return (
    <div>
            {
                task?
                <a className={`cursor-pointer ${isCompleted && "line-through"}`} onClick={() => setIsEditOpen(true)}>{task.title}</a>:
                <a className="flex text-start px-2 py-2 font-semibold gap-1 items-center hover:bg-gray-100 focus:ring-blue-400" onClick={() => setIsEditOpen(true)}>
                    <Icon icon="eva:edit-2-fill" width="16" height="16" className="text-black" /> Edit

                </a>
            }
        {isEditOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 max-md:items-end overflow-y-auto">
            <div className="relative w-2/3 h-[72%] bg-white rounded-lg shadow-sm max-md:w-full max-md:h-[92%]">
                <div className="flex items-center justify-between p-4 border-b-2 rounded-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Task
                    </h3>
                    <button
                    onClick={() => setIsEditOpen(false)}
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
                <div className="flex md:hidden gap-3 items-center justify-evenly mt-3">
                    <a className={` ${details && "bg-zinc-800 text-white border-2 "} px-16 rounded-full uppercase py-1 cursor-pointer border-2`} onClick={()=>setDetails(true)}>Details</a>
                    <a className={`${!details && "bg-zinc-800 text-white border-2 "} border-2 px-16 rounded-full uppercase py-1 cursor-pointer`} onClick={()=>setDetails(false)}>Activity</a>
                </div>
                <div className="md:flex">
                        
                    { isSmallScreen   ?(
                        details?
                    
                    <div className=" md:w-4/6 md:border-r-2">
                        <form className="p-4 md:p-5 ">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <input
                                    type="text"
                                    name="task_title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:outline-none focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="Task Title"
                                    defaultValue={task?.title}
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
                                                onChange={(newValue) => setValue(newValue)}
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
                            <div className="flex justify-end gap-2 absolute w-full rounded-b-lg bottom-0 left-0 bg-customBg px-2 py-2 border-t-2 border-gray-200">
                                <button onClick={() => setIsEditOpen(false)} className="uppercase border-2 px-5 py-2 rounded-full hover:bg-purple-50 text-sm font-medium bg-white">Cancel</button>
                                <button
                                type="submit"
                                className="text-white inline-flex items-center bg-customPurple rounded-full uppercase hover:opacity-65 font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2 text-center"
                                >
                                
                                Update
                            </button>
                            </div>
                        </form>

                    </div>:
                            
                    <div className="md:w-2/6 flex flex-col">
                        <div className=" text-start border-b-2 w-full flex flex-col py-2 px-3 max-md:hidden">
                            <h1 className="text-base font-semibold">
                                Activity

                            </h1>
                        </div>
                        <div className="items-start md:bg-customBg h-full text-xs border-gray-200 max-md:px-8 ">
                            <div className="flex justify-between' px-2 py-2  gap-16">
                                <p className=" md:w-3/5">dgsdsdfsdfdsfsdfsdfsfgsdsfsdfsdgs</p>
                                <p className=" md:w-2/5">Date 2sdf at 11:00m</p>
                            </div>
                            <div className="flex justify-between' px-2 py-2  gap-16">
                                <p className=" md:w-3/5">dgsdsdfsdfdsfsdfsdfsfgsdsfsdfsdgs</p>
                                <p className=" md:w-2/5">Date 2sdf at 11:00m</p>
                            </div>
                            <div className="flex justify-between' px-2 py-2  gap-16">
                                <p className=" md:w-3/5">dgsdsdfsdfdsfsdfsdfsfgsdsfsdfsdgs</p>
                                <p className=" md:w-2/5">Date 2sdf at 11:00m</p>
                            </div>
                            
                        </div>
                    </div>)
                    :
                    <>
                        <div className=" md:w-4/6 md:border-r-2">
                            <form className="p-4 md:p-5 ">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <input
                                        type="text"
                                        name="task_title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:outline-none focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Task Title"
                                        defaultValue={task?.title}
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
                                                    onChange={(newValue) => setValue(newValue)}
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
                                <div className="flex justify-end gap-2 absolute w-full rounded-b-lg bottom-0 left-0 bg-customBg px-2 py-2 border-t-2 border-gray-200">
                                    <button onClick={() => setIsEditOpen(false)} className="uppercase border-2 px-5 py-2 rounded-full hover:bg-purple-50 text-sm font-medium bg-white">Cancel</button>
                                    <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-customPurple rounded-full uppercase hover:opacity-65 font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2 text-center"
                                    >
                                    
                                    Update
                                </button>
                                </div>
                            </form>

                        </div>
                                
                        <div className="md:w-2/6 flex flex-col">
                            <div className=" text-start border-b-2 w-full flex flex-col py-2 px-3 max-md:hidden">
                                <h1 className="text-base font-semibold">
                                    Activity

                                </h1>
                            </div>
                            <div className="items-start md:bg-customBg h-full text-xs border-gray-200 max-md:px-8 ">
                                <div className="flex justify-between' px-2 py-2  gap-16">
                                    <p className=" md:w-3/5">dgsdsdfsdfdsfsdfsdfsfgsdsfsdfsdgs</p>
                                    <p className=" md:w-2/5">Date 2sdf at 11:00m</p>
                                </div>
                                <div className="flex justify-between' px-2 py-2  gap-16">
                                    <p className=" md:w-3/5">dgsdsdfsdfdsfsdfsdfsfgsdsfsdfsdgs</p>
                                    <p className=" md:w-2/5">Date 2sdf at 11:00m</p>
                                </div>
                                <div className="flex justify-between' px-2 py-2  gap-16">
                                    <p className=" md:w-3/5">dgsdsdfsdfdsfsdfsdfsfgsdsfsdfsdgs</p>
                                    <p className=" md:w-2/5">Date 2sdf at 11:00m</p>
                                </div>
                                
                            </div>
                        </div>
                    </>} 
                
                </div>
            </div>
        </div>
        )}
    </div>
    );
};

export default EditTaskModal;
