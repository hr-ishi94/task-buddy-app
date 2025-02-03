import { FC, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import DropDown from "./DropDown";
import { FilterViewProps } from "../types/types";
import { formatDate } from "../utils/constants";

const Filters: FC<FilterViewProps> = ({ tasks, setFilteredTasks,setIsFiltered }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const dueDates = [...new Set(tasks.map((task) => formatDate(task.due_date)))]
  .sort((a, b) => {
    // Parse dates for sorting
    const dateA = new Date(a.split(' ').reverse().join(' '));
    const dateB = new Date(b.split(' ').reverse().join(' '));

    return dateA.getTime() - dateB.getTime();
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    
    if(query !== ""){
      setIsFiltered(true)
    }else{
      setIsFiltered(false)
    }

    setSearchTerm(query);
    setFilteredTasks(tasks.filter((task) => task.title.toLowerCase().includes(query)));
  };

  return (
    <div className="flex justify-between mx-10 max-md:flex-col max-md:gap-2 max-md:mt-5">
      <div className="md:hidden flex justify-end">
        <AddTaskModal />
      </div>
      <div className="flex justify-center items-center gap-2 max-md:flex-col max-md:items-start">
        <h1 className="text-gray-600 text-sm font-medium mx-1">Filter by:</h1>
        <div className="flex gap-2">
          <DropDown title="Category" tasks={tasks} setFilteredTasks={setFilteredTasks} setIsFiltered={setIsFiltered}/>
          <DropDown title="Due Date" data={dueDates} tasks={tasks} setFilteredTasks={setFilteredTasks} setIsFiltered={setIsFiltered}/>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-grow max-md:flex-grow">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-2xl bg-white max-md:w-full focus:outline-none focus:bg-customBg"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              required
            />
          </div>
        </div>
        <div className="max-md:hidden">
          <AddTaskModal />
        </div>
      </div>
    </div>
  );
};

export default Filters;
