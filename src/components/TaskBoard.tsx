import { type TaskType, ListType } from "../types/types";
import DropDown2 from "./DropDown2";
import { format, isToday } from "date-fns";
import EditTaskModal from "./EditTaskModal";

const TaskBoard = ({
  boardType,
  tasks,
  isFiltered = false, 
}: {
  boardType: ListType["listType"];
  tasks?: TaskType[];
  isFiltered?: boolean; 
}) => {
  const bgColor: string =
    {
      Todo: "bg-[#FAC3FF]",
      "In-Progress": "bg-[#85D9F1]",
      Completed: "bg-[#A2D6A0]",
    }[boardType];

  const currTasks: TaskType[] = tasks?.filter((task) => task.status === boardType) || [];
  console.log(currTasks.length, "sdd");

  // Use the default value of isFiltered if it's not provided
  if (isFiltered && currTasks.length === 0) {
    return null;
  }

  return (
    <div className={`w-full max-w-sm bg-customBg rounded-lg px-3  pb-1 ${isFiltered ? "h-auto" : "h-[80vh]"}`}>
      <h1 className={`mt-3 inline-block px-1 text-xs font-medium text-center py-1 uppercase rounded-md ${bgColor}`}>
        {boardType}
      </h1>

      {currTasks.length !== 0 ? (
        <div className={`overflow-y-auto scrollbar-hidden flex flex-col ${isFiltered ? "" : "h-full"}`}>
          <>
            {currTasks.map((task) => (
              <div key={task.id} className="bg-white w-full min-h-28 rounded-lg my-2 flex flex-col justify-between py-2">
                <div className="flex justify-between px-2">
                  <EditTaskModal task={task} isCompleted={boardType === "Completed"} />
                  <button>
                    <DropDown2 selectType={"solar:menu-dots-bold"} taskId={task.id} task={task} />
                  </button>
                </div>
                <div className="flex text-xs text-gray-600 justify-between px-2">
                  <p>{task.category}</p>
                  {
                    (() => {
                        
                        const taskDueDate = new Date(task.due_date);

                        
                        if (isNaN(taskDueDate.getTime())) {
                            return 'Today';
                        }
                        return isToday(taskDueDate)
                            ? 'Today' 
                            : format(taskDueDate, 'dd MMM, yyyy');
                    })()
                  }
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
};

export default TaskBoard;
