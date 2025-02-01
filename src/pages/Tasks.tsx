import NavBar from '../components/NavBar'
import Filters from '../components/Filters'
import {type TaskType, ViewType } from '../types/types';
import { FC, useEffect, useState } from 'react';
import ListView from './ListView';
import BoardView from './BoardView';


const Tasks:FC = () => {

     const tasks:TaskType[] = [
        {
          id: 1,
          title: 'Interview with Design Team',
          dueDate: 'Today',
          status: 'Todo',
          category: 'Work',
        },
        {
          id: 2,
          title: 'Team Meeting',
          dueDate: '30 Dec, 2024',
          status: 'Todo',
          category: 'Personal',
        },
        {
          id: 3,
          title: 'Design a Dashboard page along with wireframes',
          dueDate: '31 Dec, 2024',
          status: 'Todo',
          category: 'Work',
        },
        {
          id: 4,
          title: 'Design a Dashboard page along with wireframes',
          dueDate: '31 Dec, 2024',
          status: 'Todo',
          category: 'Work',
        },
        {
          id: 5,
          title: 'Design a Dashboard page along with wireframes',
          dueDate: '31 Dec, 2024',
          status: 'In-Progress',
          category: 'Work',
        },
        {
          id: 6,
          title: 'Design a Dashboard page along with wireframes',
          dueDate: '31 Dec, 2024',
          status: 'In-Progress',
          category: 'Work',
        },
        {
          id: 4,
          title: 'Design a Dashboard page along with wireframes',
          dueDate: '31 Dec, 2024',
          status: 'In-Progress',
          category: 'Work',
        },
        {
          id: 5,
          title: 'Design a Dashboard page along with wireframes',
          dueDate: '31 Dec, 2024',
          status: 'Completed',
          category: 'Work',
        },
        {
          id: 6,
          title: 'Design a Dashboard page along with wireframesasdasdasfasfasfasfsesgs sdgsdgsdgsdgs efsdgsg ',
          dueDate: '31 Dec, 2024',
          status: 'Completed',
          category: 'Work',
        },
      ];

      const [isSelected, setIsSelected] = useState<ViewType>("list")

      useEffect(()=>{
        const handleResize = ()=>{
            
            if(window.innerWidth <768){
                setIsSelected("list")
            }
        }
        window.addEventListener('resize',handleResize)
        handleResize()
        return ()=>window.removeEventListener('resize',handleResize)
      },[])
  
      
  return (
    <div>
        <NavBar isSelected={isSelected} setIsSelected={setIsSelected}/>
        <Filters/>
        {isSelected === 'list' ?<ListView tasks={tasks}/>:<BoardView tasks={tasks}/>}
    </div>
  )
}

export default Tasks