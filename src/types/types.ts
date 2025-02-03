import { Dispatch, SetStateAction } from "react"
import { DateValueType } from "react-tailwindcss-datepicker"

export type TaskType = {
  id: string;
  title: string;
  due_date: string | Date; 
  status: 'Todo' | 'In-Progress' | 'Completed'; 
  category: string;
  description?:string;
  file?:string;
  user: string;
  attachment?: string;
};

export type DropDownProps = {
  title: string;
  data?: string[];
  tasks: TaskType[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setIsFiltered:React.Dispatch<React.SetStateAction<boolean>>
};

export interface TaskViewProps {
  tasks: TaskType[];  
  isFiltered?: boolean; 
  setFilteredTasks?: React.Dispatch<React.SetStateAction<TaskType[]>>; 
  setIsFiltered?: React.Dispatch<React.SetStateAction<boolean>>; 
}
export interface FilterViewProps {
  tasks: TaskType[];  
  setFilteredTasks: React.Dispatch<React.SetStateAction<TaskType[]>>; 
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>; 
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