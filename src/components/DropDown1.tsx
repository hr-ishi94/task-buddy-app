import { useState, useEffect, useRef, FC } from "react";
import { ListMapKeys, ListMap } from "../types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store"; // Import store setup
import { toast } from "react-toastify";
import { updateTask } from "../redux/taskSlice";

interface DropDownProps {
  currValue: ListMapKeys; // Expecting a key from ListMap
  taskId: string; // Task ID for updating status
}

const DropDown1: FC<DropDownProps> = ({ currValue, taskId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

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

  // Function to update task status
  const handleStatusUpdate = (newStatus: ListMapKeys) => {
    if (newStatus === currValue) return; // Prevent unnecessary updates

    dispatch(updateTask({ id: taskId, updatedTask: { status: newStatus } }))
      .unwrap()
      .then(() => {
        toast.success("Task status updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update task status.");
      });

    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-900 flex items-center justify-center bg-gray-300 border-2 px-3 py-1 text-xs rounded-lg"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {ListMap[currValue]}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 top-7 right-1 bg-white rounded-lg border-2 shadow-lg divide-y divide-gray-100">
          <ul className="text-xs text-gray-700 rounded-lg">
            {Object.keys(ListMap).map((key) => {
              const displayValue = ListMap[key as ListMapKeys];
              return (
                <li key={key}>
                  <button
                    onClick={() => handleStatusUpdate(key as ListMapKeys)}
                    className={`block px-3 py-2 w-full text-left hover:bg-gray-100 ${
                      key === currValue ? "font-bold" : ""
                    }`}
                  >
                    {displayValue}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown1;
