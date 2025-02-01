import { Board_icon, List_icon, Task_dark } from "../utils/constants"
import {Icon} from "@iconify/react" 
import {type NavProps } from "../types/types"
import { FC } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { redirect, useNavigate } from "react-router-dom"



const NavBar:FC<NavProps> = ({isSelected,setIsSelected}:any) => {

    const navigate = useNavigate()
    const LogOut =()=>{
        signOut(auth).then(()=>{

            navigate('/')

        }).catch((error)=>{
            console.log(error,'ll')
        })
    }

    
  return (
    <div className="flex justify-between px-10 py-5 max-sm:bg-[#FAEEFC] ">
        <div className="flex flex-col gap-3"> 
            <div>
                <h1 className="flex text-xl font-bold text-zinc-800 "><img src={Task_dark} alt="" />TaskBuddy</h1>
            </div>
            <div className="flex gap-2 max-sm:hidden">
                <p onClick={()=>setIsSelected("list")} className={`flex text-sm  font-bold cursor-pointer mx-1   ${isSelected === 'list'?"border-zinc-800 border-b-2 text-zinc-800":"text-zinc-600"}`}><img src={List_icon} alt="List Icon" /> List</p>
                <p onClick={()=>setIsSelected("board")}  className={`flex text-sm font-bold cursor-pointer mx-1   ${isSelected !== 'list'?"border-zinc-800 border-b-2 text-zinc-800":"text-zinc-600"}`}><img src={Board_icon} alt="Board Icon" /> Board</p>
            </div>
        </div>
        <div className="flex flex-col gap-2"> 
            <p className="flex gap-1 text-base font-bold items-center text-zinc-700 "> <Icon icon="stash:user-avatar-light" width="24" height="24" />Avatar</p>
            <button onClick={LogOut} className="flex bg-[#FFF9F9] hover:bg-gray-300 items-center gap-1 py-2 px-4 rounded-xl text-xs font-medium border-2 max-sm:hidden"><Icon icon="simple-line-icons:logout" className="" width={15} height={15}/> Logout</button>
        </div>
    </div>
  )
}

export default NavBar