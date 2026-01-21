import { HomeIcon, TasksIcon } from "../assets/icons";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  return (
    <div className="h-screen w-72 rounded-r-3xl bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-[#00adb5]">Task Manager</h1>
        <p>
          Organizador de <span className="text-[#00ADb5]">tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="default">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton variant="selected">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  );
}
