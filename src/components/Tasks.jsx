import { useState } from "react";
import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import { TaskSeparatorTitle, TasksSeparator } from "./TasnksSeparator";

export default function Task() {
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
      <div className="space-y-6 rounded-xl bg-white p-6">
        {/* Manhã */}
        <div className="space-y-3">
          <TasksSeparator>
            <SunIcon />
            <TaskSeparatorTitle>Manhã</TaskSeparatorTitle>
          </TasksSeparator>
        </div>

        {/* Tarde */}
        <div className="space-y-3">
          <TasksSeparator>
            <CloudSunIcon />
            <TaskSeparatorTitle>Tarde</TaskSeparatorTitle>
          </TasksSeparator>
        </div>

        {/* Noite */}
        <div className="space-y-3">
          <TasksSeparator>
            <MoonIcon />
            <TaskSeparatorTitle>Noite</TaskSeparatorTitle>
          </TasksSeparator>
        </div>
      </div>
    </div>
  );
}
