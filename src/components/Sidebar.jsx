import { HomeIcon, TasksIcon } from "../assets/icons";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  return (
    <div className="h-screen w-72 min-w-72 rounded-r-3xl bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p>
          Organizador de <span className="text-brand-primary">tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/" color="unselected">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton href="/tasks" color="selected">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  );
}
