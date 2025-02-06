import { FC, useState } from "react";
import TaskList from "../components/TaskList";
import GroupSelect from "../components/GroupSelect";
import { TaskViewProps} from "../types/types";
import { Icon } from "@iconify/react";

const ListView: FC<TaskViewProps> = ({ tasks, isFiltered }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]); 
  
  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const [refresh, setRefresh] = useState(false);
  console.log(refresh,'ll')
  const handleStatusUpdate = () => {
    setRefresh((prev) => !prev); // Toggle state to force re-render
  };

  
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = a.due_date ? new Date(a.due_date) : new Date(0); 
    const dateB = b.due_date ? new Date(b.due_date) : new Date(0); 
    return sortOrder === "asc"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
  

  return (
    <>
      <div className="mx-10 my-10">
        <table className="w-full text-sm text-left text-gray-500 max-md:hidden">
          <thead className="text-xs text-gray-700 border-t-2">
            <tr>
              <th scope="col" className="px-20 py-3 w-2/6">Task name</th>
              <th scope="col" className="px-28 py-3 w-1/5">
                <p className="flex">
                  Due on{" "}
                  <button onClick={handleSortChange}>
                    <Icon icon="ph:caret-up-down-fill" width="12" height="12" />
                  </button>
                </p>
              </th>
              <th scope="col" className="px-5 py-3 w-1/6">Task Status</th>
              <th scope="col" className="px-10 py-3 w-1/6">Task Category</th>
              <th scope="col" className="py-3 w-[10%]"></th>
            </tr>
          </thead>
        </table>

        <TaskList
          listType="Todo"
          isFiltered={isFiltered}
          tasks={sortedTasks.filter((task) => task.status === "Todo")}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
        <br />
        <TaskList
          listType="In-Progress"
          isFiltered={isFiltered}
          tasks={sortedTasks.filter((task) => task.status === "In-Progress")}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
        <br />
        <TaskList
          listType="Completed"
          isFiltered={isFiltered}
          tasks={sortedTasks.filter((task) => task.status === "Completed")}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
      </div>

      {selectedTasks.length > 0 && (
        <div className="w-full fixed bottom-5 flex items-center justify-center z-50">
          <GroupSelect selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} onStatusUpdate={handleStatusUpdate}/>
        </div>
      )}
    </>
  );
};

export default ListView;
