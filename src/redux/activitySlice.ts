import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, getDocs, collection, query, where, addDoc } from "../config/firebase";
import { Timestamp, DocumentData } from "firebase/firestore";
import { formatDate } from "../utils/constants";

interface ActivityType {
  id: string;
  activity: string;
  task_id: string; 
  updated_date?: string;
  created_date?: string;
}

export const fetchActivitiesByTaskId = createAsyncThunk<ActivityType[], { taskId: string }>(
  "activities/fetchActivitiesByTaskId",
  async ({ taskId }) => {
    const activityCollection = collection(db, "activity");
    const activityQuery = query(activityCollection, where("task", "==", taskId));

    const snapshot = await getDocs(activityQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        activity: data.activity || "",
        task_id: data.task || "",
        updated_date: data.updated_date instanceof Timestamp ? formatDate(data.updated_date) : data.updated_date || "",
        created_date: data.created_date instanceof Timestamp ? formatDate(data.created_date) : data.created_date || "",
      };
    });
  }
);

export const addActivity = createAsyncThunk<ActivityType, Omit<ActivityType, "id">>(
  "activities/addActivity",
  async (newActivity) => {
    const activityCollection = collection(db, "activity");

    const docRef = await addDoc(activityCollection, {
      activity: newActivity.activity,
      task: newActivity.task_id, // Consistency with Firestore
      updated_date: newActivity.updated_date ? Timestamp.fromDate(new Date(newActivity.updated_date)) : Timestamp.now(),
    });

    return {
      id: docRef.id,
      ...newActivity,
      updated_date: newActivity.updated_date || formatDate(Timestamp.now()), // Ensure consistent formatting
    };
  }
);

interface ActivityState {
  activities: ActivityType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

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
        state.error = action.error.message || "Failed to fetch activities";
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.activities.push(action.payload);
      });
  },
});

export default activitySlice.reducer;
