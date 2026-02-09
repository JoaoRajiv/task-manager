import DashboardCards from "../components/DashboardCards";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import useGetTasks from "../hooks/data/use-get-tasks";

export default function HomePage() {
  const { data: tasks } = useGetTasks();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Dashboard" subtitle="Visão geral das tarefas" />
        <DashboardCards />
        <div className="grid grid-cols-[1.5fr,1fr] gap-6">
          <div className="space-y-6 rounded-xl bg-white p-6">
            <h3 className="text-xl font-semibold">Tarefas</h3>
            <span className="text-sm text-brand-dark-gray">
              Resumos da tarefas disponíveis
            </span>
            <div className="space-y-3">
              {tasks?.length === 0 ? (
                <p>Nenhuma tarefa encontrada.</p>
              ) : (
                tasks?.map((task) => <TaskItem key={task.id} task={task} />)
              )}
            </div>
          </div>
          <div className="space-y-6 rounded-xl bg-white p-6">
            <h3 className="font-semibold">
              "Cada pequena ação de hoje te aproxima de grandes conquistas de
              amanhã. Faça o que precisa ser feito."
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
