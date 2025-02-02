import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, getDocs, collection, query, where, addDoc } from "../config/firebase";
import { Timestamp } from "firebase/firestore";
import { formatDate } from "../utils/constants";

// Define Activity Type
interface ActivityType {
  id: string;
  activity: string;
  task_id: string;
  updated_date: string;
}

// Async Thunk to Fetch Activities for a Specific Task
export const fetchActivitiesByTaskId = createAsyncThunk(
  "activities/fetchActivitiesByTaskId",
  async ({  taskId }: { taskId: string }) => {
    const activityCollection = collection(db, "activity");
    const activityQuery = query(activityCollection, where("task", "==", taskId));

    const snapshot = await getDocs(activityQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        activity: data.activity || "",
        task_id: data.task || "",
        updated_date: data.updated_date instanceof Timestamp ? formatDate(data.updated_date) : data.updated_date,
      };
    });
  }
);

// Async Thunk to Add Activity
export const addActivity = createAsyncThunk("activities/addActivity", async (newActivity: ActivityType) => {
  const activityCollection = collection(db, "activity");
  const docRef = await addDoc(activityCollection, {
    activity: newActivity.activity,
    task: newActivity.task_id,
    updated_date: Timestamp.fromDate(new Date(newActivity.updated_date)),
  });

  return {
    id: docRef.id,
    ...newActivity,
  };
});

type ActivityState = {
  activities: ActivityType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ActivityState = {
  activities: [],
  status: "idle",
  error: null,
};

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivitiesByTaskId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActivitiesByTaskId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activities = action.payload;
      })
      .addCase(fetchActivitiesByTaskId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.activities.push(action.payload);
      });
  },
});

export default activitySlice.reducer;
