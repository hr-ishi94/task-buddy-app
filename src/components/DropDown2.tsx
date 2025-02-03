import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import EditTaskModal from "./EditTaskModal";
import { deleteTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TaskType } from "../types/types";
import { AppDispatch } from "../redux/store";

const DropDown2 = ({ selectType, options, onSelect ,taskId,task}: { selectType: any; options?: string[]; onSelect?: (selected: string) => void;taskId?:string ,task?:TaskType}) => {
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect?.(option); 
    setIsOpen(false); 
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(taskId || ''));
    setIsOpen(false);
    toast.success("Task Deleted Successfully!")
  };

  return (
    <div className={`relative  ${selectedOption? "bg-gray-300 px-3 py-1 rounded-lg w-full":options?"border-2 rounded-full border-gray-300 p-2":"px-3"}`} ref={dropdownRef}>
      <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-gray-600 flex items-center justify-center text-sm cursor-pointer "
          type="button"
          aria-expanded={isOpen}  // Pass the boolean directly
          aria-haspopup="true"
        >
          {selectedOption ? (
            <h1 className="uppercase text-xs text-gray-800 font-semibold">{selectedOption}</h1>
          ) : (
            <Icon icon={`${selectType}`} width="24" height="24" />
          )}
        </button>


      {isOpen && (
        <div className="absolute right-8 top-3 z-10 mt-2 w-32 bg-white rounded-lg border-2 shadow-lg divide-y divide-gray-100">
          <ul className="text-sm text-gray-700 rounded-lg">
            {options?.map((option) => (
              <li key={option}>
                <a
                  onClick={() => handleOptionClick(option)} 
                  className="block px-4 py-2 hover:bg-gray-100 uppercase text-xs hover:font-semibold"
                >
                  {option}
                </a>
              </li>
            ))}
            {!options && (
              <>
                <li>
                  <EditTaskModal task={task} editor/>
                </li>
                <li>
                <button
                    onClick={handleDeleteTask}
                    className="flex gap-1 text-start px-2 py-2 text-red-700 font-semibold items-center hover:bg-gray-100 w-full"
                  >
                     
                    <Icon icon="material-symbols:delete" width="16" height="16" /> Delete
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown2;
