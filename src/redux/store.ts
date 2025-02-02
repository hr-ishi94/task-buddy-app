import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskSlice'
import authReducer from './authSlice'
import activityReducer from './activitySlice'

const store = configureStore({
    reducer:{
        tasks:taskReducer,
        auth:authReducer,
        activities: activityReducer
    }
})


export default store