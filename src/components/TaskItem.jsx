import { useState } from "react";
import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function TaskItem({
  task,
  handleCheckboxClick,
  onDeleteSuccess,
}) {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error("Erro ao remover tarefa!");
    }
    onDeleteSuccess(task.id);
    setDeleteIsLoading(false);
  };
  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-brand-primary text-brand-primary ";
      case "in_progress":
        return "bg-brand-process text-brand-process";
      case "pending":
        return "bg-brand-dark-blue/10 text-gray-800";
      default:
        return "bg-brand-dark-blue/10 text-gray-800";
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="danger"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
          className={`${deleteIsLoading ? "hover:bg-transparent hover:text-brand-text-gray" : ""}`}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <button className="transition hover:opacity-75">
          <Link to={`/task/${task.id}`}>
            <DetailsIcon />
          </Link>
        </button>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["pending", "in_progress", "done"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};
