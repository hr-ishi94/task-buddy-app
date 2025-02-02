import task_dark_icon from '../assets/icons/task_dark_icon.png'
import board_icon from '../assets/icons/board_icon.png'
import list_icon from '../assets/icons/list_icon.png'
import googleLogo from '../assets/icons/googleLogo.webp'
import taskLogo from '../assets/icons/taskLogo.png'
import calender_icon from '../assets/icons/calender_icon.svg'
import login_page_demo_model from '../assets/login_page_demo_model.png'
import avatar from '../assets/avatar.png'
import notFound from '../assets/notFound.png'


export const Task_dark = task_dark_icon;

export const TaskLogo = taskLogo;

export const GoogleLogo = googleLogo;

export const List_icon = list_icon;

export const Board_icon = board_icon;

export const Calender_icon = calender_icon;

export const Screenshot = login_page_demo_model

export const User_avatar = avatar

export const NotFoundImage = notFound


export const formatDate = (due_date: any) => {
  let date;

  if (due_date && due_date.toDate) {
    date = due_date.toDate(); 
  } else if (due_date instanceof Date) {
    
    date = due_date;
  } else {
    
    date = new Date(due_date);
  }

  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (date.setHours(0, 0, 0, 0) === today.getTime()) {
    return "Today";
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

