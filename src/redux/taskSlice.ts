import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { db,getDocs,collection } from "../config/firebase";
import { TaskType } from "../types/types";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async()=>{
    const tasksCollection = collection(db,"tasks")
    const snapshot = await getDocs(tasksCollection)
    return snapshot.docs.map((doc)=>({ id:doc.id,...doc.data() }))
})

type stateType ={
    tasks:TaskType[]|[],
    status:'idle'|'loading'|'succeeded'|'failed'
    error:string|null
} 

const initialState :stateType = {
    tasks:[],
    status:'idle',
    error:null
}

const taskSlice = createSlice({
    name:'tasks',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTasks.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(fetchTasks.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.tasks = action.payload
        })
        .addCase(fetchTasks.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message
        })

    }

})

export default taskSlice.reducer;