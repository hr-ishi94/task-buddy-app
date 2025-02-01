import {type ListType } from "../types/types"
import { Icon } from "@iconify/react"
import DropDown2 from "./DropDown2"


const TaskBoard = ({boardType}:{boardType: ListType['listType']}) => {
  
    const bgColor:string ={
        "Todo":'bg-[#FAC3FF]',
        'In-Progress':'bg-[#85D9F1]',
        'Completed':'bg-[#A2D6A0]'
    }[boardType]
    
return (
    <div className="w-full max-w-sm min-h-[95%] bg-customBg rounded-lg px-3 ">

        <h1 className={`mt-3 inline-block px-1 text-xs font-medium text-center py-1 uppercase rounded-md  ${bgColor} `}>
            {boardType}
        </h1>

        <div className="h-[93%] overflow-y-auto scrollbar-hidden flex flex-col "> 
        
            <div className="bg-white w-full min-h-28 rounded-lg my-2 flex flex-col justify-between py-2">
                <div className="flex justify-between px-2">
                        <h1 className="text-sm font-bold">Title</h1>
                        <button>
                                <DropDown2 selectType={'solar:menu-dots-bold'} />
                        </button>
                    </div>
                    <div className="flex text-xs text-gray-600 justify-between px-2">
                        <p>Work</p>
                        <p>Today</p>
                    </div>
                </div>
                
                <div className="bg-white w-full min-h-32 rounded-lg my-2 flex flex-col justify-between py-2">
                    <div className="flex justify-between px-2">
                        <h1 className="text-sm font-bold">Title</h1>
                        <button>
                                <DropDown2 selectType={'solar:menu-dots-bold'} />
                            </button>
                    </div>
                    <div className="flex text-xs text-gray-600 justify-between px-2">
                        <p>Work</p>
                        <p>Today</p>
                    </div>
                </div>
            
            
            
        </div>
        
    </div>
  )
}

export default TaskBoard