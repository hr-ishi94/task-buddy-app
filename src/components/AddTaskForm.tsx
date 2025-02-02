import { FC, useState } from "react";
import { Icon } from "@iconify/react";
import Datepicker from "react-tailwindcss-datepicker";
import DropDown2 from "./DropDown2";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { toast } from "react-toastify";

const AddTaskForm: FC = ({setAddForm}) => {
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskCategory, setTaskCategory] = useState<string>("");
    const [taskDueDate, setTaskDueDate] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null
    });
    const [taskStatus, setTaskStatus] = useState<string>("");

    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!taskTitle || !taskCategory || !taskDueDate.startDate || !taskStatus) {
            toast.info("Please fill all required fields.");
            return;
        }

        // Prepare task data
        const taskData = {
            title: taskTitle,
            category: taskCategory,
            due_date: taskDueDate.startDate,
            status: taskStatus,
            user: user.uid
        };

        try {
            await dispatch(addTask(taskData));
            toast.success("Task added successfully!");
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Failed to add task.");
        }

        // Reset the form
        setTaskTitle("");
        setTaskCategory("");
        setTaskDueDate({ startDate: null, endDate: null });
        setTaskStatus("");
        setAddForm(false)
    };

    return (
        <div className="bg-customBg w-full h-10 py-14 border-red-100 flex items-center px-10 border-b-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center">
                <div className="flex justify-around items-center w-full gap-28">
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="bg-customBg text-xs py font-medium ml-10 py-2 pr-10 focus:outline-none focus:bg-gray-200 px-2 "
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        required
                    />

                    <div className="relative  max-w-xs ml-36 ">
                        <Datepicker
                            placeholder="Add date"
                            containerClassName="flex items-center text-xs border-gray-300 border-2 px-1 py-1 rounded-full"
                            inputClassName="bg-customBg"
                            value={taskDueDate}
                            primaryColor="purple"
                            asSingle={true}
                            useRange={false}
                            onChange={(newValue) => setTaskDueDate(newValue)}
                            required
                        />
                    </div>

                    <div className="mr-8 mt-1 ">
                        <DropDown2
                            selectType={'ic:baseline-plus'}
                            options={["Todo", "In-Progress", "Completed"]}
                            onSelect={(status) => setTaskStatus(status)}
                        />
                    </div>

                    <div className="ml-12 mt-1 ">
                        <DropDown2
                            selectType={'ic:baseline-plus'}
                            options={["Work", "Personal"]}
                            onSelect={(category) => setTaskCategory(category)}
                        />
                    </div>
                </div>

                <div className="flex gap-3 px-10">
                    <button
                        type="submit"
                        className="flex items-center gap-1 text-white bg-customPurple text-sm px-3 py-1 rounded-full"
                    >
                        Add <Icon icon="tdesign:enter" width="15" height="15" />
                    </button>
                    <button type="button" className="uppercase text-xs font-bold" onClick={()=>setAddForm(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskForm;
