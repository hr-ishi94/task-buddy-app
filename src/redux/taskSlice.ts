import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, getDocs, collection, query, where } from "../config/firebase";
import { TaskType } from "../types/types";
import { Timestamp } from "firebase/firestore";
import { formatDate } from "../utils/constants";
import { addTaskToFirestore, deleteTaskFromFirestore, updateTaskInFirestore } from "../config/taskService";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (userId: string) => {
  const tasksCollection = collection(db, "tasks");
  const tasksQuery = query(tasksCollection, where("user", "==", userId));

  const snapshot = await getDocs(tasksQuery);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      due_date: data.due_date instanceof Timestamp ? formatDate(data.due_date) : data.due_date,
    } as TaskType;
  });
});

export const addTask = createAsyncThunk<TaskType, Omit<TaskType, "id">>(
  "tasks/addTask",
  async (task: Omit<TaskType, "id">, { rejectWithValue }) => {
    try {
      return await addTaskToFirestore(task);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedTask }: { id: string; updatedTask: Partial<TaskType> }, { rejectWithValue }) => {
    try {
      return await updateTaskInFirestore(id, updatedTask);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string, { rejectWithValue }) => {
  try {
    return await deleteTaskFromFirestore(id);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

interface TaskState {
  tasks: TaskType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: { payload: TaskType[] }) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action: { payload: TaskType }) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: { payload: TaskType }) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = { ...state.tasks[index], ...action.payload };
      })
      .addCase(deleteTask.fulfilled, (state, action: { payload: string }) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;