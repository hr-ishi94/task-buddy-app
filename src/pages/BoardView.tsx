import { FC } from "react"
import TaskBoard from "../components/TaskBoard"
import { TaskViewProps } from "../types/types"

const BoardView:FC<TaskViewProps> = ({tasks}) => {
  
  return (
    <div className="w-full h-screen flex gap-6 mx-10 my-6 max-md:hidden">
        <TaskBoard boardType={'Todo'}/>
        <TaskBoard boardType={"In-Progress"}/>
        <TaskBoard boardType={"Completed"}/>
    </div>
  )
}

export default BoardView