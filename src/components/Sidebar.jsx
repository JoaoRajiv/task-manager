import SidebarButton from './SidebarButton';
import HomeIcon from '../assets/icons/home.svg?react';
import TaskIcon from '../assets/icons/tasks.svg?react';

export default function Sidebar() {
  return (
    <div className="h-screen bg-white w-64">
      <div className="px-8 py-6 space-y-4">
        <h1 className="text-xl font-semibold text-[#00adb5]">Task Manager</h1>
        <p>
          Organizador de <span className="text-[#00ADb5]">tarefas</span>
        </p>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <SidebarButton variant="default">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton variant="selected">
          <TaskIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  );
}
