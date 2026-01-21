import { useState } from "react";
import { toast } from "sonner";
import Button from "./Button";
import { TaskSeparatorTitle, TasksSeparator } from "./TasksSeparator";
import TASKS from "../constants/tasks";
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
  const [tasks, setTasks] = useState(TASKS);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const nightTasks = tasks.filter((task) => task.time === "evening");

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.success("Tarefa removida com sucesso!");
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
          <Button variant="danger">
            Remover Tarefa
            <TrashIcon />
          </Button>
          <Button
            variant="primary"
            onClick={() => setAddTaskDialogIsOpen(!addTaskDialogIsOpen)}
          >
            Adicionar Tarefa
            <AddIcon />
          </Button>
          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>
      {/* Tasks  */}
      <div className="rounded-xl bg-white p-6">
        {/* Manhã */}
        <div className="space-y-3">
          <TasksSeparator>
            <SunIcon />
            <TaskSeparatorTitle>Manhã</TaskSeparatorTitle>
          </TasksSeparator>
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
          <TasksSeparator>
            <CloudSunIcon />
            <TaskSeparatorTitle>Tarde</TaskSeparatorTitle>
          </TasksSeparator>
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
          <TasksSeparator>
            <MoonIcon />
            <TaskSeparatorTitle>Noite</TaskSeparatorTitle>
          </TasksSeparator>
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
