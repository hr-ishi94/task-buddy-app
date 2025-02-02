import { Dispatch, SetStateAction } from "react"
import { DateValueType } from "react-tailwindcss-datepicker"

export type TaskType = {
    id:number,
    title:string,
    due_date:string,
    status: string,
    category:string
}

export type TaskViewProps = {
    tasks: TaskType[]; 
}


export type ListType = {
    listType:'Todo'|'In-Progress'|'Completed'
}

export const ListMap = {
    'Todo': 'TO-DO',
    'In-Progress': 'IN-PROGRESS',
    'Completed': 'COMPLETED'
  } as const;


export type ListMapKeys = keyof typeof ListMap;  

export type ListMapValues = typeof ListMap[ListMapKeys]

export type ViewType='list'|'board'


export type NavProps ={
    isSelected:string,
    setIsSelected:Dispatch<SetStateAction<ViewType>>
}

export type DateValue = DateValueType;