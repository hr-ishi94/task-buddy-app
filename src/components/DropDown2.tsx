import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import EditTaskModal from "./EditTaskModal";

const DropDown2 = ({selectType,options}:{selectType:any,options?:string[]}) => {
  
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-600 flex items-center justify-center text-sm "
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* {
          selectType === 'add' ?
        } */}
        <Icon icon={`${selectType}`} width="24" height="24" />
        
      </button>

      {isOpen && (
        <div className="absolute right-8 top-3 z-10 mt-2 w-32 bg-white rounded-lg border-2 shadow-lg divide-y divide-gray-100 ">
          <ul className="text-sm text-gray-700 rounded-lg">
            {options?.map((option)=>(

              <li key={option}>
                <a
                  
                  className="block px-4 py-2 hover:bg-gray-100 uppercase text-xs"
                  >
                  {option}
                </a>
              </li>
              ))}
              {!options &&
              <>
                <li >
                  <EditTaskModal/>
                  {/* <a
                    
                    className="flex text-start px-2 py-2 font-semibold gap-1 items-center hover:bg-gray-100 "
                    >
                    <Icon icon="eva:edit-2-fill" width="16" height="16" className="text-black" /> Edit
                  </a> */}
                </li>
                <li >
                  <a
                    
                    className="flex gap-1 text-start px-2 py-2 text-red-700 font-semibold items-center  hover:bg-gray-100 "
                    >
                    <Icon icon="material-symbols:delete" width="16" height="16" /> Delete
                  </a>
                </li>
              </>
            }
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown2;
