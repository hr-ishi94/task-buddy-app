import {type TaskType,  ListType } from "../types/types"
import { Icon } from "@iconify/react"
import DropDown2 from "./DropDown2"

const TaskBoard = ({ boardType, tasks, isFiltered }: { boardType: ListType['listType'], tasks?: TaskType[], isFiltered: boolean }) => {

    const bgColor: string = {
        "Todo": 'bg-[#FAC3FF]',
        'In-Progress': 'bg-[#85D9F1]',
        'Completed': 'bg-[#A2D6A0]'
    }[boardType];

    const currTasks: TaskType[] = tasks?.filter((task) => task.status === boardType) || [];
    console.log(currTasks.length,'sdd')
    if (isFiltered && currTasks.length === 0) {
        return null;
    }

    return (
        <div className={`w-full max-w-sm bg-customBg rounded-lg px-3 ${isFiltered ? 'h-auto' : 'h-[95%]'}`}>

            <h1 className={`mt-3 inline-block px-1 text-xs font-medium text-center py-1 uppercase rounded-md ${bgColor}`}>
                {boardType}
            </h1>

                {currTasks.length !== 0 ? (
            <div className={`overflow-y-auto scrollbar-hidden flex flex-col ${isFiltered ? '' : 'h-[93%]'}`}>
                    <>
                        {currTasks.map((task) => (
                            <div key={task.id} className="bg-white w-full min-h-28 rounded-lg my-2 flex flex-col justify-between py-2">
                                <div className="flex justify-between px-2">
                                    <h1 className="text-sm font-bold">{task.title}</h1>
                                    <button>
                                        <DropDown2 selectType={'solar:menu-dots-bold'} />
                                    </button>
                                </div>
                                <div className="flex text-xs text-gray-600 justify-between px-2">
                                    <p>{task.category}</p>
                                    <p>{task.due_date}</p>
                                </div>
                            </div>
                        ))}
                    </>
            </div>
                ) : (
                    <div className="flex justify-center items-center h-5/6">
                        <h1 className="text-center text-sm font-medium text-gray-600">No Tasks in {boardType}</h1>
                    </div>
                )}

        </div>
    );
}

export default TaskBoard;
