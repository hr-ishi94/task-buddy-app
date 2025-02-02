import { useState, useEffect, useRef, FC } from "react";
import { ListMapKeys,ListMap } from "../types/types";

interface DropDownProps {
    currValue: ListMapKeys; // Expecting a key from ListMap
  }
  
const DropDown1:FC<DropDownProps> = ({currValue}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-900 flex items-center justify-center bg-gray-300 border-2 px-3  py-1 text-xs rounded-lg"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {ListMap[currValue]}
        
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 top-7 right-1 bg-white rounded-lg border-2 shadow-lg divide-y divide-gray-100 ">
          <ul className="text-xs  text-gray-700 rounded-">
            
            {Object.keys(ListMap).map((key) => {
                const displayValue = ListMap[key as keyof typeof ListMap];
                return (
                <li key={key}>
                    <a
                    href="#"
                    className={`block px-1 py-2 text-xs  hover:bg-gray-100 ${
                        key === currValue ? "font-bold" : ""
                    }`}
                    >
                    {displayValue} 
                    </a>
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
