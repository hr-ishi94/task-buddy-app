import { FC } from "react";
import TaskList from "../components/TaskList"
import {type TaskViewProps} from "../types/types";



const ListView:FC<TaskViewProps> = ({tasks}) => {
  
  return (
    <>
      <div className="mx-10 my-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 max-md:hidden">
                <thead className="text-xs text-gray-700 border-t-2  ">
                    <tr>
                        <th scope="col" className="px-20 py-3 w-2/6">
                            Task name
                        </th>
                        <th scope="col" className="px-24 py-3 w-1/6">
                            Due on
                        </th>
                        <th scope="col" className="px-16 py-3 w-1/6">
                            Task Status
                        </th>
                        <th scope="col" className="px-16 py-3 w-1/6">
                            Task Category
                        </th>
                        <th scope="col" className="px-8 py-3 w-1/6">
                        
                        </th>
                    </tr>
                </thead>
            </table>
                <TaskList listType="Todo" tasks={tasks}/>
                <br />
                <TaskList listType="In-Progress" tasks={tasks}/>
                <br />
                <TaskList listType="Completed" tasks={tasks}/>
        </div>

    </>

  )
}

export default ListView