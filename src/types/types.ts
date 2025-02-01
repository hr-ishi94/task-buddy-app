import { Dispatch, SetStateAction } from "react"
import { DateValueType } from "react-tailwindcss-datepicker"

export type TaskType = {
    id:number,
    title:string,
    dueDate:string,
    status: string,
    category:string
}

export type TaskViewProps = {
    tasks: TaskType[]; 
}

export type ListType = {
    listType:'Todo'|'In-Progress'|'Completed'
}

export type ViewType='list'|'board'


export type NavProps ={
    isSelected:string,
    setIsSelected:Dispatch<SetStateAction<ViewType>>
}

export type DateValue = DateValueType;