import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

export default function TaskItem({
  task,
  handleCheckboxClick,
  handleDeleteClick,
}) {
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
        <Button color="danger" onClick={() => handleDeleteClick(task.id)}>
          <TrashIcon />
        </Button>
        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
}
