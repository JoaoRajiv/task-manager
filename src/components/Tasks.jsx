import { useState } from "react";
import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import { TaskSeparatorTitle, TasksSeparator } from "./TasnksSeparator";
import TASKS from "../constants/tasks";
import TaskItem from "./TaskItem";

export default function Task() {
  const [tasks, setTasks] = useState(TASKS);
  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const nightTasks = tasks.filter((task) => task.time === "evening");

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      if (task.status === "pending") {
        return { ...task, status: "in_progress" };
      }
      if (task.status === "in_progress") {
        return { ...task, status: "done" };
      }
      if (task.status === "done") {
        return { ...task, status: "pending" };
      }
    });
    setTasks(newTasks);
  };

  return (
    <div className="w-full px-8 py-16">
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
          <Button variant="primary">
            Adicionar Tarefa
            <AddIcon />
          </Button>
        </div>
      </div>
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
              handleTaskCheckboxClick={handleTaskCheckboxClick}
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
              handleTaskCheckboxClick={handleTaskCheckboxClick}
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
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
