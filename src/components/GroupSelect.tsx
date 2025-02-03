import { Icon } from "@iconify/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../redux/taskSlice";
import { AppDispatch } from "../redux/store";
import { ListType } from "../types/types";


interface GroupSelectProps {
  selectedTasks: string[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>; 
}

const GroupSelect: React.FC<GroupSelectProps> = ({ selectedTasks, setSelectedTasks }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false); 
  const [status, setStatus] = useState<string>("Status");
  const options = ["Todo", "In-Progress", "Completed"]; 
  const dispatch = useDispatch<AppDispatch>(); 

  
  const handleUpdateStatus = (newStatus: ListType['listType'] ): void => {
    selectedTasks.forEach((taskId) => {
      dispatch(updateTask({ id: taskId, updatedTask: { status: newStatus } }));
    });
    setStatus(newStatus);
    setSelectedTasks([]); 
    setShowOptions(false); 
  };

  
  const handleDeleteTasks = (): void => {
    selectedTasks.forEach((taskId) => {
      dispatch(deleteTask(taskId));
    });
    setSelectedTasks([]); 
  };

  return (
    <div className="bg-gray-900 text-gray-100 w-[30%] max-md:w-[80%] flex py-2 rounded-xl px-3 justify-between relative">
      <div className="flex items-center gap-1">
        <div className="flex px-2 py-1 border-2 border-gray-100 rounded-full gap-2 items-center text-sm">
          <p>{selectedTasks.length} Tasks Selected</p>
          <button onClick={() => setSelectedTasks([])}>
            <Icon icon="akar-icons:cross" width="17" height="17" />
          </button>
        </div>

        <Icon icon="fluent:select-all-on-24-filled" width="18" height="18" />
      </div>

      <div className="flex gap-2 relative">
        <div className="relative">
          <button
            className="px-3 py-2 border-2 border-gray-100 rounded-full text-sm bg-gray-800 hover:bg-gray-500"
            onClick={() => setShowOptions(!showOptions)}
          >
            {status}
          </button>
          {showOptions && (
            <div className="absolute bottom-full mb-2 w-24 bg-gray-800 border border-gray-100 rounded-lg shadow-lg text-xs">
              {options.map((option) => (
                <div
                  key={option}
                  className="px-1 py-3 text-center hover:bg-gray-600 hover:font-semibold cursor-pointer uppercase"
                  onClick={() => handleUpdateStatus(option as "Todo" | "In-Progress" | "Completed")}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="px-3 py-2 border-2 border-gray-100 rounded-full text-sm text-red-900 bg-red-800 bg-opacity-15 hover:bg-red-300"
          onClick={handleDeleteTasks}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GroupSelect;
