import { useState, useEffect, useRef } from "react";
import { DropDownProps} from "../types/types";



const DropDown = ({ title, data, tasks, setFilteredTasks,setIsFiltered }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = (value: string) => {
    setIsFiltered(true)
    setSelected(value);
    setIsOpen(false);
  
    if (title === "Category") {
      setFilteredTasks(tasks.filter((task) => task.category === value));
    } else if (title === "Due Date") {
      setFilteredTasks(tasks.filter((task) => task.due_date === value));
    }
  };
  

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-600 flex items-center justify-center rounded-full border-2 px-3 py-2 text-sm"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {selected || title}
        <svg
          className={`w-3 h-3 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
          aria-hidden="true"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white rounded-lg border-2 shadow-lg">
          <ul className="text-sm text-gray-700">
            {(data?.length ? data : ["Work", "Personal"]).map((item, index) => (
              <li key={index}>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </button>
              </li>
            ))}
            {/* Reset Filter Option */}
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                onClick={() => {
                  setSelected(null);
                  setFilteredTasks(tasks);
                  setIsOpen(false);
                  setIsFiltered(false)
                }}
              >
                Reset
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
