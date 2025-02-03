import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskSlice";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters";
import ListView from "./ListView";
import BoardView from "./BoardView";
import { TaskType, ViewType } from "../types/types";
import NotFound from "../components/NotFound";
import Loader from "../components/Loader";
import { AppDispatch, RootState } from "../redux/store";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, error } = useSelector((state: RootState) => state.tasks); // Add RootState type here
  const user = useSelector((state: RootState) => state.auth.user);

  const [isSelected, setIsSelected] = useState<ViewType>("list");
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSelected("list");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(error,'error')

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <NavBar isSelected={isSelected} setIsSelected={setIsSelected} />
      <Filters tasks={tasks} setFilteredTasks={setFilteredTasks} setIsFiltered={setIsFiltered} />
      {filteredTasks.length === 0 ? <NotFound /> : (
        <>
          {isSelected === "list" ? (
            <ListView tasks={filteredTasks} isFiltered={isFiltered} />
          ) : (
            <BoardView tasks={filteredTasks} isFiltered={isFiltered} />
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;
