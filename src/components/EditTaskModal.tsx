import { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import Datepicker from "react-tailwindcss-datepicker";
import { Icon } from "@iconify/react";
import { TaskType, DateValue } from "../types/types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/taskSlice";
import { addActivity, fetchActivitiesByTaskId } from "../redux/activitySlice";
import { RootState, AppDispatch } from "../redux/store";

const EditTaskModal = ({ task, isCompleted ,editor}: { task?: TaskType,isCompleted?:boolean ,editor?:boolean}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState<string>(task?.title || "");
    const [taskDescription, setTaskDescription] = useState<string>(task?.description || "");
    const [taskCategory, setTaskCategory] = useState<string>(task?.category || "");
    const [taskDueDate, setTaskDueDate] = useState<DateValue>({
        startDate: task?.due_date ? new Date(task.due_date) : null,
        endDate: null,
    });
    const [taskStatus, setTaskStatus] = useState<string>(task?.status || "");
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [details, setDetails] = useState<boolean>(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const activities = useSelector((state:RootState) => state.activities.activities);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        if (task) {
            dispatch(fetchActivitiesByTaskId({ taskId: task.id }));
        }
    }, [dispatch, task]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    
        if (!taskTitle || !taskDescription || !taskCategory || !taskDueDate?.startDate || !taskStatus) {
            toast.info("Please fill all required fields.");
            return;
        }

        
        const updatedTask = {
            id: task?.id || "", 
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
            due_date: taskDueDate.startDate,
            status: taskStatus as "Todo" | "In-Progress" | "Completed",
            file: files.length > 0 ? await convertFileToBase64(files[0]) : task?.file || "", // Handle file updates
        };

        try {
           
            await dispatch(updateTask({ id: task?.id || "", updatedTask }));
            toast.success("Task updated successfully!");

            
            await dispatch(
                addActivity({
                    activity: `Updated task: ${taskTitle}`,
                    task_id: task?.id || "",
                    updated_date: new Date().toISOString(),
                })
            );

            setIsEditOpen(false); 
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task.");
        }
    };

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
            {task && !editor ? (
                <a
                    className={`cursor-pointer ${isCompleted && "line-through"} text-sm font-semibold`}
                    onClick={() => setIsEditOpen(true)}
                >
                    {task.title}
                </a>
            ) : (
                <a
                    className="flex text-start px-2 py-2 font-semibold gap-1 items-center hover:bg-gray-100 focus:ring-blue-400"
                    onClick={() => setIsEditOpen(true)}
                >
                    <Icon icon="eva:edit-2-fill" width="16" height="16" className="text-black" /> Edit
                </a>
            )}

            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 max-md:items-end overflow-y-auto">
                    <div className="relative w-2/3 h-[90%] max-h-[90vh] min-h-[fit-content] bg-white rounded-lg shadow-sm max-md:w-full max-md:max-h-[92vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b-2 rounded-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit Task
                            </h3>
                            <button
                                onClick={() => setIsEditOpen(false)}
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

                        <div className="flex md:hidden gap-3 items-center justify-evenly mt-3">
                            <a
                                className={`${details && "bg-zinc-800 text-white border-2"} px-16 rounded-full uppercase py-1 cursor-pointer border-2`}
                                onClick={() => setDetails(true)}
                            >
                                Details
                            </a>
                            <a
                                className={`${!details && "bg-zinc-800 text-white border-2"} border-2 px-16 rounded-full uppercase py-1 cursor-pointer`}
                                onClick={() => setDetails(false)}
                            >
                                Activity
                            </a>
                        </div>

                        <div className="md:flex">
                            {(isSmallScreen ? details : true) && (
                                <div className="md:w-4/6 md:border-r-2">
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
                                                {task?.file && (
                                                    <div className="mt-2 flex items-center justify-between border p-2 rounded-md bg-gray-100">
                                                        <span className="text-sm font-medium text-gray-700">File Attached</span>
                                                        {/* <div className="flex gap-2">
                                                            <a
                                                                href={`data:application/octet-stream;base64,${task.file}`}
                                                                download="attachment"
                                                                className="text-blue-600 text-sm hover:underline"
                                                            >
                                                                Download
                                                            </a>
                                                            <button
                                                                type="button"
                                                                onClick={() => setTaskFile(null)}
                                                                className="text-red-500 text-sm hover:underline"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div> */}
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 absolute w-full rounded-b-lg bottom-0 left-0 bg-customBg px-2 py-2 border-t-2 border-gray-200">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditOpen(false)}
                                                className="uppercase border-2 px-5 py-2 rounded-full hover:bg-purple-50 text-sm font-medium bg-white"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="text-white inline-flex items-center bg-customPurple rounded-full uppercase hover:opacity-65 font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2 text-center"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {(isSmallScreen ? !details : true) && (
                                <div className="md:w-2/6 flex flex-col">
                                    <div className="text-start border-b-2 w-full flex flex-col py-2 px-3 max-md:hidden">
                                        <h1 className="text-base font-semibold">Activity</h1>
                                    </div>
                                    <div className="items-start md:bg-customBg h-[66vh] text-xs border-gray-200 max-md:px-8">
                                        
                                        <div className="items-start md:bg-customBg h-[66vh] text-xs border-gray-200 max-md:px-8">
                                        {activities.map((activity) => (
                                            <div key={activity.id} className="flex justify-between px-2 py-2 gap-16">
                                                <p className="md:w-3/5">{activity.activity}</p>
                                                <p className="md:w-2/5">{activity.updated_date}</p>
                                            </div>
                                        ))}
                                    </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTaskModal;