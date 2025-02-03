import { DocumentData } from "firebase/firestore";
import {
  db,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "../config/firebase";
import { TaskType } from "../types/types";


export const fetchTasksFromFirestore = async (userId: string): Promise<TaskType[]> => {
  try {
    const tasksCollection = collection(db, "tasks");
    const tasksQuery = query(tasksCollection, where("user", "==", userId));
    const snapshot = await getDocs(tasksQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;

      return {
        id: doc.id,
        title: data.title || "",
        category: data.category || "",
        due_date: data.due_date || "",
        status: data.status || "",
        user: data.user || "",
        attachment: data.attachment || "",
      } as TaskType;
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};


export const addTaskToFirestore = async (task: Omit<TaskType, "id">): Promise<TaskType> => {
  try {
    const tasksCollection = collection(db, "tasks");
    const docRef = await addDoc(tasksCollection, task);
    return { id: docRef.id, ...task };
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task.");
  }
};

export const updateTaskInFirestore = async (
  id: string,
  updatedTask: Partial<TaskType>
): Promise<TaskType> => {
  try {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updatedTask);

    
    return {
      id,
      title: updatedTask.title ?? "", 
      due_date: updatedTask.due_date ?? "", 
      status: updatedTask.status ?? "Todo", 
      category: updatedTask.category ?? "", 
      user: updatedTask.user ?? "",
      attachment: updatedTask.attachment ?? "",
    };
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task.");
  }
};


export const deleteTaskFromFirestore = async (id: string): Promise<string> => {
  try {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
    return id;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task.");
  }
};
