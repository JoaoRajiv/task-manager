export default function TaskItem({ task }) {
  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-brand-primary/10 text-brand-primary ";
      case "in_progress":
        return "bg-brand-process/10 text-brand-process";
      case "pending":
        return "bg-brand-dark-blue/10 text-gray-800";
      default:
        return "bg-brand-dark-blue/10 text-gray-800";
    }
  };
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  );
}
