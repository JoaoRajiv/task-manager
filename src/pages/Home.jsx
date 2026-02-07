import { GlassWater, LayoutList, LoaderIcon, TasksIcon } from "../assets/icons";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useGetTasks from "../hooks/data/use-get-tasks";

export default function HomePage() {
  const { data: tasks } = useGetTasks();
  const pendingTasks =
    tasks?.filter((task) => task.status === "pending").length || 0;
  const inProgressTasks =
    tasks?.filter((task) => task.status === "in_progress").length || 0;
  const doneTasks = tasks?.filter((task) => task.status === "done").length || 0;
  const totalTasks = tasks?.length || 0;
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Dashboard" subtitle="Visão geral das tarefas" />
        <div className="grid grid-cols-2 gap-9 lg:grid-cols-4">
          <DashboardCard
            title="Tarefas disponíveis"
            value={pendingTasks}
            icon={<LayoutList />}
          />
          <DashboardCard
            title="Tarefas concluídas"
            value={doneTasks}
            icon={<TasksIcon />}
          />
          <DashboardCard
            title="Tarefas atrasadas"
            value={inProgressTasks}
            icon={<LoaderIcon />}
          />
          <DashboardCard
            title="Total de tarefas"
            value={totalTasks}
            icon={<GlassWater />}
          />
        </div>
      </div>
    </div>
  );
}
