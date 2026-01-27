import { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "./Button";
import TasksSeparator from "./TasksSeparator";
import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import TaskItem from "./TaskItem";
import AddTaskDialog from "./AddTaskDialog";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    try {
      const fetchTasks = async () => {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data[1]);
        setTasks(data);
      };
      fetchTasks();
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }, []);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const nightTasks = tasks.filter((task) => task.time === "evening");

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.success("Tarefa removida com sucesso!");
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
    toast.success("Todas as tarefas foram removidas!");
  };

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      if (task.status === "pending") {
        toast.info("Tarefa em progresso!");
        return { ...task, status: "in_progress" };
      }
      if (task.status === "in_progress") {
        toast.success("Tarefa concluída!");
        return { ...task, status: "done" };
      }
      if (task.status === "done") {
        toast.info("Tarefa marcada como pendente!");
        return { ...task, status: "pending" };
      }
    });
    setTasks(newTasks);
  };

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
    toast.success("Tarefa adicionada com sucesso!");
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      {/* Título  */}
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            color="danger"
            size="large"
            onClick={() => handleDeleteAllTasks()}
          >
            Remover Tarefas
            <TrashIcon />
          </Button>
          <Button
            color="primary"
            onClick={() => setAddTaskDialogIsOpen(!addTaskDialogIsOpen)}
            size="large"
          >
            Adicionar Tarefa
            <AddIcon />
          </Button>
          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            handleSubmit={handleAddTask}
          />
        </div>
      </div>
      {/* Tasks  */}
      <div className="rounded-xl bg-white p-6">
        {/* Manhã */}
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        {/* Tarde */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        {/* Noite */}
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
