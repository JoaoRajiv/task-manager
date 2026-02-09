import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import useDeleteTask from "../hooks/data/use-delete-task";
import useUpdateTask from "../hooks/data/use-update-task";

export default function TaskItem({ task }) {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);

  const { mutate: updateTask } = useUpdateTask(task.id);

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa");
      },
    });
  };

  const handleCheckboxClick = () => {
    updateTask(
      { status: getNewStatus() },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao atualizar tarefa");
        },
      },
    );
  };

  const getNewStatus = () => {
    if (task.status === "pending") {
      return "in_progress";
    }
    if (task.status === "in_progress") {
      return "done";
    }
    return "pending";
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
            onChange={handleCheckboxClick}
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
          disabled={isPending}
          className={`${isPending ? "hover:bg-transparent hover:text-brand-text-gray" : ""}`}
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : <TrashIcon />}
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
};
