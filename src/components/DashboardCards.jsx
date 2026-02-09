import { GlassWater, LayoutList, LoaderIcon, TasksIcon } from "../assets/icons";
import useGetTasks from "../hooks/data/use-get-tasks";
import DashboardCard from "./DashboardCard";

export default function DashboardCards() {
  const { data: tasks } = useGetTasks();
  const pendingTasks =
    tasks?.filter((task) => task.status === "pending").length || 0;
  const inProgressTasks =
    tasks?.filter((task) => task.status === "in_progress").length || 0;
  const doneTasks = tasks?.filter((task) => task.status === "done").length || 0;
  const totalTasks = tasks?.length || 0;
  return (
    <div className="grid grid-cols-2 gap-9 lg:grid-cols-4">
      <DashboardCard
        title="Tarefas em andamento"
        value={inProgressTasks}
        icon={<TasksIcon />}
      />
      <DashboardCard
        title="Tarefas não iniciadas"
        value={pendingTasks}
        icon={<TasksIcon />}
      />
      <DashboardCard
        title="Tarefas concluídas"
        value={doneTasks}
        icon={<LoaderIcon />}
      />
      <DashboardCard
        title="Tarefas totais"
        value={totalTasks}
        icon={<LayoutList />}
      />
    </div>
  );
}
