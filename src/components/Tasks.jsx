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
import RemoveTaskDialog from "./RemoveTaskDialog";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);
  const [removeTaskDialogIsOpen, setRemoveTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    try {
      const fetchTasks = async () => {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "GET",
        });
        const data = await response.json();
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

  const onDeleteTaskSuccess = async (taskId) => {
    console.log("Deleting task with ID:", taskId);
    await fetch(taskId, {
      method: "DELETE",
    });
    toast.success("Tarefa deletada com sucesso!");
  };

  const handleDeleteTask = async () => {};

  const handleDeleteAllTasks = () => {
    setRemoveTaskDialogIsOpen(!removeTaskDialogIsOpen);
    setTasks([]);
    toast.success("Todas as tarefas foram removidas!");
  };

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
    setTasks(newTasks);
  };

  const onTaskSubmitSuccess = async (task) => {
    setTasks([...tasks, task]);
    toast.success("Tarefa adicionada com sucesso!");
  };

  const onTaskSubmitError = () => {
    toast.error("Erro ao adicionar tarefa!");
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
            onClick={() => setRemoveTaskDialogIsOpen(!removeTaskDialogIsOpen)}
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

          <RemoveTaskDialog
            isOpen={removeTaskDialogIsOpen}
            handleClose={() => setRemoveTaskDialogIsOpen(false)}
            handleDeleteAllTasks={handleDeleteAllTasks}
          />

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            onSubmitSuccess={onTaskSubmitSuccess}
            onSubmitError={onTaskSubmitError}
          />
        </div>
      </div>
      {/* Tasks  */}
      <div className="rounded-xl bg-white p-6">
        {/* Manhã */}
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para manhã.
            </p>
          )}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        {/* Tarde */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para tarde.
            </p>
          )}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        {/* Noite */}
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {nightTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para noite.
            </p>
          )}
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
