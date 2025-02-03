import { FC, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValue } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { toast } from "react-toastify";
import { addActivity } from "../redux/activitySlice";
import { AppDispatch, RootState } from "../redux/store";

const AddTaskModal: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskCategory, setTaskCategory] = useState<string>("");
    const [taskDueDate, setTaskDueDate] = useState<DateValue>({ startDate: null, endDate: null });
    const [taskStatus, setTaskStatus] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const newFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const handleDateChange = (newValue: DateValue): void => {
        setTaskDueDate(newValue);
    };


    const user = useSelector((state:RootState)=>state.auth.user)

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!taskTitle || !taskDescription || !taskCategory || !taskDueDate?.startDate || !taskStatus) {
            toast.info("Please fill all required fields.");
            return;
        }
    
        let fileBase64: string | undefined = undefined;  // Change this to `undefined` instead of `null`
        if (files.length > 0) {
            const file = files[0];
            fileBase64 = await convertFileToBase64(file);
        }
        
        const userId = user?.uid || ""

        const taskDueDateString = taskDueDate?.startDate ? taskDueDate.startDate.toISOString() : "";

        const allowedStatuses = ["Todo", "In-Progress", "Completed"];
            if (!allowedStatuses.includes(taskStatus)) {
                toast.info("Invalid task status.");
                return;
            }

        const taskData = {
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
            due_date: taskDueDateString,
            status: taskStatus as "Todo" | "In-Progress" | "Completed",
            user: userId,
            file: fileBase64, 
        };
    
        try {
            // Dispatch the action and check if it was successful
            const resultAction = await dispatch(addTask(taskData));
    
            if (addTask.fulfilled.match(resultAction)) {
                // Access the payload which contains the task data
                const task = resultAction.payload; // This will be of type TaskType
                console.log(task, 'Task added successfully');
    
                // You can safely access task.id, task.title, etc.
                await dispatch(
                    addActivity({
                        activity: `Created task: ${task.title}`,
                        task_id: task.id || "",
                        updated_date: new Date().toISOString(),
                    })
                );
                toast.success("Task added successfully!");
            } else {
                toast.error("Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Failed to add task.");
        }
    
        
        setTaskTitle("");
        setTaskDescription("");
        setTaskCategory("");
        setTaskDueDate({ startDate: null, endDate: null });
        setTaskStatus("");
        setFiles([]);
        setIsOpen(false);
    };
    
    
    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
               
                const base64String = (reader.result as string).split(",")[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };
    return (
        <div>
            <button
                className="bg-customPurple rounded-full text-xs text-white px-5 py-3"
                onClick={() => setIsOpen(true)}
            >
                ADD TASK
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 max-md:items-end overflow-y-auto">
                    <div className="relative w-2/5 h-5/6 max-h-[90vh] min-h-[fit-content] bg-white rounded-lg shadow-sm max-md:w-full max-md:max-h-[92vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b-2 rounded-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Create Task
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            >
                                <svg
                                    className="w-3 h-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <input
                                        type="text"
                                        name="task_title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:outline-none focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Task Title"
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <RichTextEditor
                                        value={taskDescription}
                                        onChange={setTaskDescription}
                                    />
                                </div>

                                <div className="col-span-2 flex justify-evenly gap-16 max-md:flex-col max-md:gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-gray-600 gap-1">
                                            Task Category*
                                        </label>
                                        <div className="flex gap-2 text-sm">
                                            <button
                                                type="button"
                                                className={`px-3 text-xs font-medium rounded-full border-2 py-2 hover:bg-customBg focus:ring-purple-700 cursor-pointer ${
                                                    taskCategory === "Work" ? "bg-customBg" : ""
                                                }`}
                                                onClick={() => setTaskCategory("Work")}
                                            >
                                                Work
                                            </button>
                                            <button
                                                type="button"
                                                className={`px-3 text-xs font-medium rounded-full border-2 py-2 hover:bg-customBg focus:ring-purple-700 cursor-pointer ${
                                                    taskCategory === "Personal" ? "bg-customBg" : ""
                                                }`}
                                                onClick={() => setTaskCategory("Personal")}
                                            >
                                                Personal
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-gray-600">Due on*</label>
                                        <div className="relative w-full bg-customBg rounded-lg max-md:w-2/3">
                                            <Datepicker
                                                placeholder="DD/MM/YYYY"
                                                containerClassName="flex items-center text-xs border-gray-300 border-2 px-1 py-2 rounded-lg max-md:w-full"
                                                inputClassName="bg-customBg text-xs"
                                                value={taskDueDate}
                                                primaryColor="purple"
                                                asSingle={true}
                                                useRange={false}
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-gray-600">
                                            Task Status*
                                        </label>
                                        <select
                                            className="bg-customBg border border-gray-300 text-gray-500 text-xs font-medium rounded-lg focus:outline-none block w-full pr-12 py-2 max-md:w-2/3"
                                            value={taskStatus}
                                            onChange={(e) => setTaskStatus(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Choose
                                            </option>
                                            <option value="Todo">TO-DO</option>
                                            <option value="In-Progress">IN-PROGRESS</option>
                                            <option value="Completed">COMPLETED</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-sm text-gray-600">Attachment</label>
                                    <div
                                        className={`w-full bg-customBg rounded-lg border-gray-300 border-2 py-2 relative ${
                                            isDragging ? "border-blue-500" : ""
                                        }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            id="file-upload"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileInputChange}
                                            multiple
                                        />
                                        <h1 className="text-center text-xs">
                                            Drop your files here or{" "}
                                            <span className="underline text-blue-700">Upload</span>
                                        </h1>
                                    </div>
                                    {files.length > 0 && (
                                        <div className="mt-2">
                                            <h3 className="text-sm font-medium text-gray-600">Selected Files:</h3>
                                            <ul className="list-disc list-inside">
                                                {files.map((file, index) => (
                                                    <li key={index} className="text-xs text-gray-500">
                                                        {file.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className=" flex justify-end gap-2 absolute bottom-0 right-0 left-0 bg-customBg px-2 py-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="uppercase border-2 px-5 py-2 rounded-full hover:bg-purple-50 text-sm font-medium bg-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-customPurple rounded-full uppercase hover:opacity-65 font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2 text-center"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTaskModal;