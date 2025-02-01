import { useState, useEffect, useRef } from "react";

const DropDown = () => {
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
        className="text-gray-600 flex items-center justify-center rounded-full border-2 px-3 py-2 text-sm"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Category
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

      {isOpen && (
        <div className="absolute z-10 mt-2 w-44 bg-white rounded-lg border-2 shadow-lg divide-y divide-gray-100 ">
          <ul className="text-sm text-gray-700 rounded-">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100  "
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </a>
            </li>
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
