import { useState } from "react"
import { Icon } from "@iconify/react"
import {type TaskType,ListType } from "../types/types"
import AddTaskForm from "./AddTaskForm"
import DropDown2 from "./DropDown2"
import EditTaskModal from "./EditTaskModal"
import DropDown1 from "./DropDown1"
import { format, isToday } from 'date-fns';

const TaskList = ({
    listType,
    tasks,
    isFiltered,
    selectedTasks,
    setSelectedTasks
  }: {
    listType: ListType["listType"];
    tasks?: TaskType[];
    isFiltered: boolean;
    selectedTasks: string[];
    setSelectedTasks: (tasks: string[]) => void;
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [addForm, setAddForm] = useState<boolean>(false)

    const bgColor:string ={
        "Todo":'bg-[#FAC3FF]',
        'In-Progress':'bg-[#85D9F1]',
        'Completed':'bg-[#CEFFCC]'
    }[listType]
    console.log(isFiltered,'klklkl')
    const currTasks:TaskType[]  = tasks?.filter((task)=>task.status === listType) || []
    if (isFiltered && currTasks.length === 0) {
        return null
    }

    const handleCheckboxChange = (taskId: string) => {
        setSelectedTasks(
          selectedTasks.includes(taskId)
            ? selectedTasks.filter((id) => id !== taskId)
            : [...selectedTasks, taskId]
        );
      };

    return (
    <div className= {`rounded-lg bg-customBg ${!isOpen || isFiltered ? "" : listType === "Todo" ? "min-h-72" : "min-h-40"} `}>
        <div className={`${bgColor} w-full h-10 ${isOpen?"rounded-t-lg":'rounded-lg'} flex  items-center justify-between text-sm font-bold px-5`}>

            <h1>{listType} ({currTasks?.length||'0'})</h1>
            <button className="font-bold " onClick={() => setIsOpen((prev) => !prev)} >
            <svg
          className={`w-3 h-3 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
          aria-hidden="true"
          >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
            />
            </svg>
            </button>
        </div>

        {isOpen &&
        
            <>
                {listType=== 'Todo' &&
                    <div className="max-md:hidden">
                    
                    <div className="bg-customBg w-full h-10 border-b-2 border-red-100 flex items-center px-10 ">
                    <button onClick={() => setAddForm((prev) => !prev)} className="uppercase text-xs font-bold flex items-center gap-1 justify-center text-gray-800 px-5"><Icon icon="ic:baseline-plus" width="20" height="20" className="text-customPurple" /> Add Task</button>
                    </div>
                    {addForm &&
                    <AddTaskForm setAddForm= {setAddForm}/>
                    }
                </div>}
                
                {(currTasks && currTasks.length != 0) ?
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-customBg rounded-b-lg">
                        <tbody className="rounded-b-lg ">
                    
                        {currTasks?.map((task)=>(
                            
                            <tr key={task.id} className=" border-b-2  border-gray-200 w-full  text-black max-md:flex">
                                <td className="py-6 pl-5 pr-3 flex items-center justify-center gap-2 text-gray-600  ">
                                <input
                                    type="checkbox"
                                    checked={selectedTasks.includes(task.id)}
                                    onChange={() => handleCheckboxChange(task.id)}
                                    className="mr-2"
                                    />
                                    <Icon icon="icon-park-outline:drag" width="15" height="15" className="max-md:hidden"/>
                                    <Icon icon="ep:success-filled" width="15" height="15" className={listType==='Completed'?"text-green-700":""}/>
                                </td>
                                <td scope="row" className="pl-2 py-4 font-semibold w-2/6 max-md:w-4/6">
                                <EditTaskModal task={task} isCompleted ={listType ==='Completed'} />
                                </td>
                                <td className="px-16 py-4 w-1/6 max-md:hidden text-center">
                                   {
                                                                           // Conditionally check and format the date
                                    (() => {
                                    const taskDueDate = new Date(task.due_date);

                                    // Check if the date is today
                                    return isToday(taskDueDate)
                                        ? 'Today'  // If it's today, show "Today"
                                        : format(taskDueDate, 'dd MMM, yyyy');  // Otherwise, format as "DD MMM, YYYY"
                                    })()
                                }

                                </td>
                                <td className="px-16 py-4 w-1/5 max-md:hidden text-center">
                                    <DropDown1 currValue = {task.status} taskId={task.id}/>
                                </td>
                                <td className="pl-16 text-center py-4 w-1/6 max-md:hidden">
                                    {task.category}
                                </td>
                                
                                <td className="pl-44 py-4 w-1/6 max-md:hidden">
                                    <button>
                                        <DropDown2 selectType={'solar:menu-dots-bold'}  taskId={task.id} task={task}/>
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    : 
                    <div className="flex justify-center items-center relative top-10">
                        <h1 className="text-center text-sm font-medium text-gray-600 ">No Tasks in {listType}</h1>
                    </div>
                }
            </>
        }
                
</div>

)
}

export default TaskList