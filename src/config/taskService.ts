import { db, collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc } from "../config/firebase";
import { TaskType } from "../types/types";

export const fetchTasksFromFirestore = async (userId: string) => {
  const tasksCollection = collection(db, "tasks");
  const tasksQuery = query(tasksCollection, where("user", "==", userId));
  const snapshot = await getDocs(tasksQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TaskType[];
};

export const addTaskToFirestore = async (task: Omit<TaskType, "id">) => {
  const tasksCollection = collection(db, "tasks");
  const docRef = await addDoc(tasksCollection, task);
  return { id: docRef.id, ...task };
};

export const updateTaskInFirestore = async (id: string, updatedTask: Partial<TaskType>) => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, updatedTask);
  return { id, ...updatedTask };
};

export const deleteTaskFromFirestore = async (id: string) => {
  const taskRef = doc(db, "tasks", id);
  await deleteDoc(taskRef);
  return id;
};
