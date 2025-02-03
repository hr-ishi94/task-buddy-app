import task_dark_icon from '../assets/icons/task_dark_icon.png'
import board_icon from '../assets/icons/board_icon.png'
import list_icon from '../assets/icons/list_icon.png'
import googleLogo from '../assets/icons/googleLogo.webp'
import taskLogo from '../assets/icons/taskLogo.png'
import calender_icon from '../assets/icons/calender_icon.svg'
import login_page_demo_model from '../assets/login_page_demo_model.png'
import avatar from '../assets/avatar.png'
import notFound from '../assets/notFound.png'

export const Task_dark: string = task_dark_icon;
export const TaskLogo: string = taskLogo;
export const GoogleLogo: string = googleLogo;
export const List_icon: string = list_icon;
export const Board_icon: string = board_icon;
export const Calender_icon: string = calender_icon;
export const Screenshot: string = login_page_demo_model;
export const User_avatar: string = avatar;
export const NotFoundImage: string = notFound;
import { Timestamp } from 'firebase/firestore';

export const formatDate = (due_date: string | Date | Timestamp): string => {
  let date: Date;

  
  if (due_date instanceof Timestamp) {
    date = due_date.toDate();
  }
  
  else if (due_date instanceof Date) {
    date = due_date;
  }
  
  else if (typeof due_date === 'string') {
    date = new Date(due_date);
  } else {
    throw new Error('Invalid date format');
  }

 
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  date.setHours(0, 0, 0, 0);    

  if (date.getTime() === today.getTime()) {
    return "Today";
  }

  
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};
