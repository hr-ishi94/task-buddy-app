import { FC } from "react"
import TaskBoard from "../components/TaskBoard"
import { TaskViewProps } from "../types/types"

const BoardView:FC<TaskViewProps> = ({tasks,isFiltered}) => {
  
  return (
    <div className="w-full h-screen flex gap-6 mx-10 my-6 max-md:hidden">
        <TaskBoard boardType={'Todo'} tasks={tasks}/>
        <TaskBoard boardType={"In-Progress"} tasks={tasks}/>
        <TaskBoard boardType={"Completed"} tasks={tasks}/>
    </div>
  )
}

export default BoardView