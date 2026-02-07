import { toast } from "sonner";
import TasksSeparator from "./TasksSeparator";
import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";
import TaskItem from "./TaskItem";
import { useQueryClient } from "@tanstack/react-query";
import useGetTasks from "../hooks/data/use-get-tasks";
import Header from "./Header";
import { taskQueriesKeys } from "../keys/queries";

export default function Task() {
  const queryClient = useQueryClient();
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const nightTasks = tasks?.filter((task) => task.time === "evening");

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      if (task.status === "pending") {
        toast.info("Tarefa em progresso!", { duration: 1000 });
        return { ...task, status: "in_progress" };
      }
      if (task.status === "in_progress") {
        toast.success("Tarefa concluída!", { duration: 1000 });
        return { ...task, status: "done" };
      }
      if (task.status === "done") {
        toast.info("Tarefa marcada como pendente!", { duration: 1000 });
        return { ...task, status: "pending" };
      }
    });
    queryClient.setQueryData(taskQueriesKeys.getAll(), newTasks);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      {/* Título  */}
      <Header title="Minhas tarefas" subtitle="Minhas tarefas" />
      {/* Tasks  */}
      <div className="rounded-xl bg-white p-6">
        {/* Manhã */}
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        {/* Tarde */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para tarde.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        {/* Noite */}
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {nightTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para noite.
            </p>
          )}
          {nightTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
