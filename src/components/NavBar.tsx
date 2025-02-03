import { Board_icon, List_icon, Task_dark, User_avatar } from "../utils/constants"
import {Icon} from "@iconify/react" 
import {type NavProps } from "../types/types"
import { FC } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"



const NavBar:FC<NavProps> = ({isSelected,setIsSelected}:any) => {

    const user = useSelector((state:RootState)=>state.auth.user)

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
        <div className="flex flex-col gap-2 "> 
        <div className="flex text-sm  gap-1 w-15 items-center">
            <img src={user?.photoURL || User_avatar}  className="rounded-full w-8 h-8" />

            <p className="flex font-bold text-zinc-700 "> {user?.displayName||"USER"}</p>
        </div>
            <div className="flex justify-end items-center">

            <button onClick={LogOut} className="flex bg-[#FFF9F9] hover:bg-gray-300 items-center gap-1 py-2 px-4 rounded-xl text-xs font-medium border-2 max-sm:hidden"><Icon icon="simple-line-icons:logout" className="" width={15} height={15}/> Logout</button>
            </div>
        </div>
    </div>
  )
}

export default NavBar