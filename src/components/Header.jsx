import Button from "./Button";
import { TrashIcon, AddIcon } from "../assets/icons";
import RemoveTaskDialog from "./RemoveTaskDialog";
import AddTaskDialog from "./AddTaskDialog";
import { useState } from "react";

export default function Header({ title, subtitle }) {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);
  const [removeTaskDialogIsOpen, setRemoveTaskDialogIsOpen] = useState(false);

  const handleDeleteAllTasks = () => {
    setRemoveTaskDialogIsOpen(!removeTaskDialogIsOpen);
  };

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
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
        />
      </div>
    </div>
  );
}
